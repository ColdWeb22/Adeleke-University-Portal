import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || ''
const SMTP_FROM_EMAIL = Deno.env.get('SMTP_FROM_EMAIL') || 'noreply@adeleke.edu.ng'

interface EmailRequest {
    type: 'payment_confirmation' | 'grade_notification' | 'enrollment_confirmation' | 'deadline_reminder'
    to: string
    data: Record<string, any>
}

serve(async (req) => {
    try {
        const { type, to, data }: EmailRequest = await req.json()

        let subject = ''
        let html = ''

        switch (type) {
            case 'payment_confirmation':
                subject = 'Payment Confirmation - Adeleke University'
                html = generatePaymentConfirmationEmail(data)
                break

            case 'grade_notification':
                subject = `New Grade Posted - ${data.course_code}`
                html = generateGradeNotificationEmail(data)
                break

            case 'enrollment_confirmation':
                subject = `Course Enrollment Confirmed - ${data.course_code}`
                html = generateEnrollmentConfirmationEmail(data)
                break

            case 'deadline_reminder':
                subject = 'Important Deadline Reminder'
                html = generateDeadlineReminderEmail(data)
                break

            default:
                throw new Error('Invalid email type')
        }

        // Send email using Resend (or your SMTP provider)
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: SMTP_FROM_EMAIL,
                to: [to],
                subject,
                html,
            }),
        })

        if (!response.ok) {
            const error = await response.text()
            throw new Error(`Email send failed: ${error}`)
        }

        const result = await response.json()

        return new Response(JSON.stringify({ success: true, id: result.id }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        })
    } catch (error) {
        console.error('Email send error:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        })
    }
})

// ============================================
// Email Templates
// ============================================

function generatePaymentConfirmationEmail(data: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .amount { font-size: 32px; font-weight: bold; color: #2563eb; margin: 10px 0; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Payment Confirmed ✓</h1>
        </div>
        <div class="content">
          <p>Dear ${data.student_name},</p>
          
          <p>Your payment has been successfully processed!</p>
          
          <div class="info-box">
            <div class="amount">₦${data.amount.toLocaleString()}</div>
            <p><strong>Payment Type:</strong> ${data.payment_type.charAt(0).toUpperCase() + data.payment_type.slice(1)}</p>
            <p><strong>Reference:</strong> ${data.reference}</p>
            <p><strong>Date:</strong> ${new Date(data.payment_date).toLocaleDateString()}</p>
          </div>
          
          <p>This payment has been added to your account. You can view your full payment history in the Financials section of your student portal.</p>
          
          <p>If you have any questions or concerns about this payment, please contact the Bursary Department.</p>
          
          <p>Best regards,<br>
          <strong>Adeleke University Bursary</strong></p>
        </div>
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} Adeleke University. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateGradeNotificationEmail(data: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .grade-box { background: white; border: 2px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 10px; text-align: center; }
        .grade { font-size: 48px; font-weight: bold; color: #10b981; margin: 10px 0; }
        .score { font-size: 24px; color: #6b7280; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 New Grade Posted</h1>
        </div>
        <div class="content">
          <p>Dear ${data.student_name},</p>
          
          <p>Your grade for <strong>${data.course_code} - ${data.course_title}</strong> has been posted.</p>
          
          <div class="grade-box">
            <div class="grade">${data.letter_grade}</div>
            <div class="score">${data.total_score}/100</div>
          </div>
          
          <p>You can view the detailed breakdown of your score in the Grades section of your student portal.</p>
          
          <p>Keep up the great work!</p>
          
          <p>Best regards,<br>
          <strong>Adeleke University Academic Affairs</strong></p>
        </div>
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} Adeleke University. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateEnrollmentConfirmationEmail(data: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .course-box { background: white; border-left: 4px solid #7c3aed; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎓 Enrollment Confirmed</h1>
        </div>
        <div class="content">
          <p>Dear ${data.student_name},</p>
          
          <p>Your enrollment has been successfully confirmed!</p>
          
          <div class="course-box">
            <h2 style="margin: 0 0 10px 0; color: #7c3aed;">${data.course_code}</h2>
            <p style="margin: 5px 0;"><strong>${data.course_title}</strong></p>
            <p style="margin: 5px 0; color: #6b7280;">
              ${data.course_units} Units • ${data.semester === 'first' ? 'First' : 'Second'} Semester • ${data.academic_year}
            </p>
          </div>
          
          <p>You can view your complete course schedule and timetable in your student portal.</p>
          
          <p>Good luck with your studies!</p>
          
          <p>Best regards,<br>
          <strong>Adeleke University Registrar</strong></p>
        </div>
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} Adeleke University. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateDeadlineReminderEmail(data: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .alert-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⏰ Deadline Reminder</h1>
        </div>
        <div class="content">
          <p>Dear ${data.student_name},</p>
          
          <div class="alert-box">
            <h3 style="margin: 0 0 10px 0; color: #d97706;">${data.title}</h3>
            <p style="margin: 5px 0;"><strong>Deadline:</strong> ${new Date(data.deadline).toLocaleDateString()}</p>
            <p style="margin: 5px 0;">${data.description}</p>
          </div>
          
          <p>Please ensure you complete this before the deadline to avoid any complications.</p>
          
          <p>If you have already completed this, please disregard this reminder.</p>
          
          <p>Best regards,<br>
          <strong>Adeleke University Portal</strong></p>
        </div>
        <div class="footer">
          <p>This is an automated reminder. Please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} Adeleke University. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}
