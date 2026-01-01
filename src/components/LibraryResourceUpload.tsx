import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, FileText, Download, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { uploadLibraryResource, downloadFile, deleteFile } from '../lib/storage';
import { z } from 'zod';

const libraryUploadSchema = z.object({
    file: z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, 'File must be less than 5MB'),
    title: z.string().min(3, 'Title is required'),
    author: z.string().optional(),
    category: z.string().optional(),
    resourceType: z.enum(['book', 'journal', 'pdf', 'video']),
});

type LibraryUploadFormData = z.infer<typeof libraryUploadSchema>;

export default function LibraryResourceUpload() {
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const form = useForm<LibraryUploadFormData>({
        resolver: zodResolver(libraryUploadSchema),
        defaultValues: {
            title: '',
            author: '',
            category: '',
            resourceType: 'pdf',
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            // Auto-fill title from filename
            if (!form.getValues('title')) {
                const titleFromFile = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
                form.setValue('title', titleFromFile);
            }
        }
    };

    const onSubmit = async (data: LibraryUploadFormData) => {
        if (!selectedFile) {
            toast.error('Please select a file');
            return;
        }

        setUploading(true);

        const { error } = await uploadLibraryResource(selectedFile, {
            title: data.title,
            author: data.author,
            category: data.category,
            resourceType: data.resourceType,
        });

        if (error) {
            toast.error(error);
        } else {
            toast.success('Resource uploaded successfully!');
            form.reset();
            setSelectedFile(null);
        }

        setUploading(false);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Library Resource</h3>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* File Upload */}
                <div>
                    <label className="block text-sm text-gray-500 mb-2">File</label>
                    <div className="relative">
                        <input
                            type="file"
                            accept="application/pdf,video/mp4,video/webm"
                            onChange={handleFileChange}
                            className="hidden"
                            id="library-file-upload"
                        />
                        <label
                            htmlFor="library-file-upload"
                            className="flex items-center gap-3 p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-red-600 transition"
                        >
                            {selectedFile ? (
                                <>
                                    <FileText size={24} className="text-red-400" />
                                    <div className="flex-1">
                                        <div className="text-gray-900 font-medium">{selectedFile.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Upload size={24} className="text-gray-400" />
                                    <div className="flex-1">
                                        <div className="text-gray-900 font-medium">Choose file</div>
                                        <div className="text-xs text-gray-500">PDF or Video (max 5MB)</div>
                                    </div>
                                </>
                            )}
                        </label>
                    </div>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm text-gray-500 mb-2">Title *</label>
                    <input
                        {...form.register('title')}
                        type="text"
                        placeholder="Introduction to Computer Science"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600"
                    />
                    {form.formState.errors.title && (
                        <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} />
                            {form.formState.errors.title.message}
                        </p>
                    )}
                </div>

                {/* Author */}
                <div>
                    <label className="block text-sm text-gray-500 mb-2">Author</label>
                    <input
                        {...form.register('author')}
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600"
                    />
                </div>

                {/* Resource Type */}
                <div>
                    <label className="block text-sm text-gray-500 mb-2">Type *</label>
                    <select
                        {...form.register('resourceType')}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-red-600"
                    >
                        <option value="pdf">PDF Document</option>
                        <option value="book">Book</option>
                        <option value="journal">Journal</option>
                        <option value="video">Video</option>
                    </select>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm text-gray-500 mb-2">Category</label>
                    <input
                        {...form.register('category')}
                        type="text"
                        placeholder="Computer Science, Mathematics, etc."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={uploading || !selectedFile}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-red-700 transition shadow-sm"
                >
                    {uploading ? 'Uploading...' : 'Upload Resource'}
                </button>
            </form>
        </div>
    );
}

// ============================================
// Library Resource Card (for display/download)
// ============================================

interface LibraryResourceCardProps {
    resource: {
        id: string;
        title: string;
        author?: string;
        resource_type: string;
        file_url: string;
        category?: string;
    };
    onDelete?: (id: string) => void;
    showActions?: boolean;
}

export function LibraryResourceCard({ resource, onDelete, showActions = false }: LibraryResourceCardProps) {
    const [downloading, setDownloading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDownload = async () => {
        setDownloading(true);
        const filePath = resource.file_url.split('/').slice(-2).join('/'); // Get path from URL
        const { error } = await downloadFile('library-resources', filePath, resource.title);

        if (error) {
            toast.error('Failed to download file');
        } else {
            toast.success('Download started');
        }
        setDownloading(false);
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this resource?')) return;

        setDeleting(true);
        const filePath = resource.file_url.split('/').slice(-2).join('/');
        const { error } = await deleteFile('library-resources', filePath);

        if (error) {
            toast.error('Failed to delete file');
        } else {
            toast.success('Resource deleted');
            if (onDelete) onDelete(resource.id);
        }
        setDeleting(false);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-red-600/50 transition shadow-sm">
            <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                    <FileText size={24} className="text-red-600" />
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1">{resource.title}</h4>
                    {resource.author && (
                        <p className="text-sm text-gray-500 mb-1">by {resource.author}</p>
                    )}
                    <div className="flex items-center gap-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize">
                            {resource.resource_type}
                        </span>
                        {resource.category && (
                            <span className="text-xs text-gray-500">{resource.category}</span>
                        )}
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 shadow-sm"
                        title="Download"
                    >
                        <Download size={16} />
                    </button>
                    {showActions && (
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 shadow-sm"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
