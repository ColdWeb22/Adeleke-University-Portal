import { useState } from 'react';
import { Upload, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { uploadProfilePicture } from '../lib/storage';
import { useAuth } from '../contexts/AuthContext';
import { z } from 'zod';

// Local validation schema
const avatarSchema = z.object({
    file: z.instanceof(File)
        .refine((file) => file.size <= 2 * 1024 * 1024, 'Image must be less than 2MB')
        .refine(
            (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
            'Only JPEG, PNG, and WebP images are allowed'
        ),
});

interface ProfilePictureUploadProps {
    currentAvatarUrl?: string;
    onUploadSuccess?: (url: string) => void;
}

export default function ProfilePictureUpload({ currentAvatarUrl, onUploadSuccess }: ProfilePictureUploadProps) {
    const { user } = useAuth();
    const [preview, setPreview] = useState<string | null>(currentAvatarUrl || null);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file
        const result = avatarSchema.safeParse({ file });
        if (!result.success) {
            toast.error(result.error.issues[0].message);
            return;
        }

        setSelectedFile(file);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        if (!selectedFile || !user?.id) return;

        setUploading(true);

        const { url, error } = await uploadProfilePicture(user.id, selectedFile);

        if (error) {
            toast.error(error);
        } else if (url) {
            toast.success('Profile picture updated!');
            setPreview(url);
            if (onUploadSuccess) onUploadSuccess(url);
        }

        setUploading(false);
        setSelectedFile(null);
    };

    const handleCancel = () => {
        setSelectedFile(null);
        setPreview(currentAvatarUrl || null);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>

            <div className="flex items-start gap-6">
                {/* Preview */}
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gray-50 border-2 border-gray-200 overflow-hidden flex items-center justify-center">
                        {preview ? (
                            <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <ImageIcon size={48} className="text-gray-400" />
                        )}
                    </div>
                    {selectedFile && (
                        <div className="absolute -bottom-2 -right-2 bg-red-600 rounded-full p-2">
                            <CheckCircle size={16} className="text-white" />
                        </div>
                    )}
                </div>

                {/* Upload Controls */}
                <div className="flex-1">
                    <div className="mb-4">
                        <label
                            htmlFor="avatar-upload"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition shadow-sm"
                        >
                            <Upload size={16} />
                            Choose Image
                        </label>
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    <div className="text-xs text-gray-500 mb-4">
                        <p>• Max file size: 2MB</p>
                        <p>• Allowed formats: JPEG, PNG, WebP</p>
                        <p>• Recommended: Square image, 400x400px</p>
                    </div>

                    {selectedFile && (
                        <div className="flex gap-2">
                            <button
                                onClick={handleUpload}
                                disabled={uploading}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition disabled:opacity-50 shadow-sm"
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={uploading}
                                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition disabled:opacity-50 shadow-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
