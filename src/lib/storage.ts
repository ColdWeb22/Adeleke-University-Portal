import { supabase } from '../lib/supabase';

// ============================================
// PROFILE PICTURE UPLOAD
// ============================================

export async function uploadProfilePicture(userId: string, file: File): Promise<{ url: string | null; error: string | null }> {
    try {
        // Validate file size (2MB max)
        if (file.size > 2 * 1024 * 1024) {
            return { url: null, error: 'File size must be less than 2MB' };
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return { url: null, error: 'Only JPEG, PNG, and WebP images are allowed' };
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}/avatar-${Date.now()}.${fileExt}`;

        // Delete old profile picture if exists
        const { data: existingFiles } = await supabase
            .storage
            .from('profile-pictures')
            .list(userId);

        if (existingFiles && existingFiles.length > 0) {
            await supabase
                .storage
                .from('profile-pictures')
                .remove(existingFiles.map(file => `${userId}/${file.name}`));
        }

        // Upload new picture
        const { error: uploadError } = await supabase
            .storage
            .from('profile-pictures')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: true,
            });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase
            .storage
            .from('profile-pictures')
            .getPublicUrl(fileName);

        // Update profile table with new avatar URL
        await (supabase as any)
            .from('profiles')
            .update({ avatar_url: publicUrl })
            .eq('id', userId);

        return { url: publicUrl, error: null };
    } catch (error: any) {
        return { url: null, error: error.message };
    }
}

// ============================================
// LIBRARY RESOURCE UPLOAD
// ============================================

export async function uploadLibraryResource(file: File, metadata: {
    title: string;
    author?: string;
    category?: string;
    resourceType: 'book' | 'journal' | 'pdf' | 'video';
}): Promise<{ resourceId: string | null; error: string | null }> {
    try {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            return { resourceId: null, error: 'File size must be less than 5MB' };
        }

        // Validate file type based on resource type
        const allowedTypes: Record<string, string[]> = {
            book: ['application/pdf'],
            journal: ['application/pdf'],
            pdf: ['application/pdf'],
            video: ['video/mp4', 'video/webm'],
        };

        const allowed = allowedTypes[metadata.resourceType] || [];
        if (!allowed.includes(file.type)) {
            return { resourceId: null, error: `Invalid file type for ${metadata.resourceType}` };
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${metadata.resourceType}s/${Date.now()}-${metadata.title.replace(/\s+/g, '-').toLowerCase()}.${fileExt}`;

        // Upload file to storage
        const { error: uploadError } = await supabase
            .storage
            .from('library-resources')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase
            .storage
            .from('library-resources')
            .getPublicUrl(fileName);

        // Create library resource record in database
        const { data: resource, error: dbError } = await (supabase as any)
            .from('library_resources')
            .insert({
                title: metadata.title,
                author: metadata.author,
                category: metadata.category,
                resource_type: metadata.resourceType,
                file_url: publicUrl,
                total_copies: 1,
                available_copies: 1,
            })
            .select()
            .single();

        if (dbError) {
            // Cleanup uploaded file if database insert fails
            await supabase.storage.from('library-resources').remove([fileName]);
            throw dbError;
        }

        return { resourceId: resource.id, error: null };
    } catch (error: any) {
        return { resourceId: null, error: error.message };
    }
}

// ============================================
// FILE DOWNLOAD
// ============================================

export async function downloadFile(bucketName: string, filePath: string, downloadName?: string): Promise<{ success: boolean; error: string | null }> {
    try {
        const { data, error } = await supabase
            .storage
            .from(bucketName)
            .download(filePath);

        if (error) throw error;

        // Create download link
        const url = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = downloadName || filePath.split('/').pop() || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        return { success: true, error: null };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// ============================================
// DELETE FILE
// ============================================

export async function deleteFile(bucketName: string, filePath: string): Promise<{ success: boolean; error: string | null }> {
    try {
        const { error } = await supabase
            .storage
            .from(bucketName)
            .remove([filePath]);

        if (error) throw error;

        return { success: true, error: null };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// ============================================
// GET PUBLIC URL
// ============================================

export function getPublicUrl(bucketName: string, filePath: string): string {
    const { data } = supabase
        .storage
        .from(bucketName)
        .getPublicUrl(filePath);

    return data.publicUrl;
}

// ============================================
// LIST FILES
// ============================================

export async function listFiles(bucketName: string, folder?: string): Promise<{ files: any[] | null; error: string | null }> {
    try {
        const { data, error } = await supabase
            .storage
            .from(bucketName)
            .list(folder, {
                limit: 100,
                offset: 0,
                sortBy: { column: 'created_at', order: 'desc' },
            });

        if (error) throw error;

        return { files: data, error: null };
    } catch (error: any) {
        return { files: null, error: error.message };
    }
}
