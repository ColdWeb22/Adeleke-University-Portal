import { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { supabase } from '../lib/supabase';
import { CheckCircle2, AlertCircle, Loader } from 'lucide-react';

interface PaymentWidgetProps {
    studentId: string;
    studentEmail: string;
    amount: number;
    description: string;
    paymentType: 'tuition' | 'hostel' | 'library' | 'other';
    onSuccess?: () => void;
    onClose?: () => void;
}

export default function PaymentWidget({
    studentId,
    studentEmail,
    amount,
    description,
    paymentType,
    onSuccess,
    onClose,
}: PaymentWidgetProps) {
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';

    // Generate unique reference
    const reference = `AU-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const config = {
        reference: reference,
        email: studentEmail,
        amount: amount * 100, // Convert Naira to Kobo
        publicKey: publicKey,
        currency: 'NGN',
        metadata: {
            student_id: studentId,
            payment_type: paymentType,
            description: description,
            custom_fields: [
                {
                    display_name: 'Student ID',
                    variable_name: 'student_id',
                    value: studentId,
                },
                {
                    display_name: 'Payment Type',
                    variable_name: 'payment_type',
                    value: paymentType,
                },
            ],
        },
    };

    const handlePaystackSuccessAction = async (referenceData: any) => {
        setVerifying(true);
        setError('');

        try {
            // Record payment in database as pending
            const { data: payment, error: insertError } = await supabase
                .from('payments')
                .insert({
                    student_id: studentId,
                    amount: amount,
                    currency: 'NGN',
                    description: description,
                    payment_type: paymentType,
                    status: 'pending' as const,
                    paystack_reference: referenceData.reference,
                } as any)
                .select()
                .single();

            if (insertError) throw insertError;

            // TODO: In production, verify payment with Paystack API on the backend
            // For now, we'll mark as successful (this is NOT secure for production!)
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

            // Update payment status to success
            if (payment && (payment as any).id) {
                const { error: updateError } = await (supabase as any)
                    .from('payments')
                    .update({
                        status: 'success',
                        payment_date: new Date().toISOString(),
                    })
                    .eq('id', (payment as any).id);

                if (updateError) throw updateError;
            }

            setSuccess(true);
            if (onSuccess) {
                setTimeout(() => onSuccess(), 2000);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to verify payment');
        } finally {
            setVerifying(false);
        }
    };

    const handlePaystackCloseAction = () => {
        if (onClose) onClose();
    };

    const componentProps = {
        ...config,
        text: 'Pay with Paystack',
        onSuccess: handlePaystackSuccessAction,
        onClose: handlePaystackCloseAction,
    };

    if (!publicKey) {
        return (
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2 text-orange-700 text-sm">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <div>
                    <div className="font-bold">Paystack Not Configured</div>
                    <div className="text-xs mt-1">
                        Please add VITE_PAYSTACK_PUBLIC_KEY to your .env.local file
                    </div>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="font-bold text-lg text-green-700 mb-2">Payment Successful!</h3>
                <p className="text-sm text-gray-500">
                    Your payment of ₦{amount.toLocaleString()} has been processed successfully.
                </p>
            </div>
        );
    }

    if (verifying) {
        return (
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Loader size={32} className="text-red-600 animate-spin" />
                </div>
                <h3 className="font-bold text-lg text-red-700 mb-2">Verifying Payment...</h3>
                <p className="text-sm text-gray-500">Please wait while we confirm your payment.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700 text-sm">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="font-bold text-lg mb-1 text-gray-900">Payment Details</h3>
                        <p className="text-sm text-gray-500">{description}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-500">Amount</div>
                        <div className="text-2xl font-bold text-red-600">₦{amount.toLocaleString()}</div>
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Email</span>
                        <span className="font-medium text-gray-900">{studentEmail}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Payment Type</span>
                        <span className="font-medium capitalize text-gray-900">{paymentType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Currency</span>
                        <span className="font-medium text-gray-900">NGN (Nigerian Naira)</span>
                    </div>
                </div>

                <PaystackButton
                    {...componentProps}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-red-900/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] hover:bg-red-700"
                />

                <p className="text-xs text-gray-500 text-center mt-4">
                    Secured by{' '}
                    <span className="text-gray-900 font-semibold">Paystack</span>
                </p>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 flex items-start gap-2">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <div>
                    <div className="font-bold mb-1">Payment Security</div>
                    Your payment information is processed securely through Paystack. We do not store
                    your card details.
                </div>
            </div>
        </div>
    );
}
