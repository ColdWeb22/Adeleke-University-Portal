# File Upload System Guide

Complete guide to using the Supabase Storage file upload system for profile pictures and library resources.

## 🎯 Features Implemented

✅ **Profile Picture Upload** - Avatar management with preview  
✅ **Library Resource Upload** - PDFs, videos, documents  
✅ **File Download** - Direct download functionality  
✅ **File Deletion** - Admin/owner file removal  
✅ **Size & Type Validation** - Client-side validation  
✅ **RLS Security** - Row-level security policies  

---

## 🚀 Quick Setup (One-time)

### Step 1: Create Storage Buckets

Run this in **Supabase Dashboard → SQL Editor**:

```sql
-- Copy entire contents of:
supabase/storage_setup.sql
```

This creates:
- `profile-pictures` bucket (public)
- `library-resources` bucket (public)
- RLS policies for secure access

### Step 2: Verify Buckets

1. Go to **Storage** in Supabase Dashboard
2. You should see two buckets:
   - `profile-pictures`
   - `library-resources`

---

## 📸 Profile Picture Upload

### Usage in Profile/Settings Page

```tsx
import ProfilePictureUpload from '../components/ProfilePictureUpload';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileSettings() {
  const { user } = useAuth();

  return (
    <div>
      <ProfilePictureUpload 
        currentAvatarUrl={user?.avatar_url}
        onUploadSuccess={(url) => {
          console.log('New avatar URL:', url);
          // Optionally refresh user data
        }}
      />
    </div>
  );
}
```

### Features:
- ✅ Live preview before upload
- ✅ Drag-and-drop or click to upload
- ✅ Auto-delete old avatar
- ✅ Size limit: 2MB
- ✅ Formats: JPEG, PNG, WebP
- ✅ Updates `profiles.avatar_url` automatically

---

## 📚 Library Resource Upload

### Usage in Library Management Page

```tsx
import LibraryResourceUpload, { LibraryResourceCard } from '../components/LibraryResourceUpload';

export default function LibraryManagement() {
  const [resources, setResources] = useState([]);

  return (
    <div>
      {/* Upload Form (Lecturers/Admins Only) */}
      <LibraryResourceUpload />

      {/* Display Resources */}
      <div className="grid gap-4 mt-6">
        {resources.map((resource) => (
          <LibraryResourceCard
            key={resource.id}
            resource={resource}
            showActions={true} // Show delete button for admins
            onDelete={(id) => {
              setResources(prev => prev.filter(r => r.id !== id));
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

### Features:
- ✅ Upload PDFs and videos
- ✅ Auto-fill title from filename
- ✅ Download with one click
- ✅ Admin deletion
- ✅ Size limit: 5MB
- ✅ Creates database record automatically

---

## 🔧 Direct Storage API Usage

### Upload File

```tsx
import { uploadProfilePicture, uploadLibraryResource } from '../lib/storage';

// Profile picture
const { url, error } = await uploadProfilePicture(userId, fileObject);

// Library resource
const { resourceId, error } = await uploadLibraryResource(fileObject, {
  title: 'Introduction to AI',
  author: 'John Doe',
  category: 'Computer Science',
  resourceType: 'pdf',
});
```

### Download File

```tsx
import { downloadFile } from '../lib/storage';

const { success, error } = await downloadFile(
  'library-resources', // bucket name
  'pdfs/1234567890-ai-introduction.pdf', // file path
  'AI_Introduction.pdf' // download name (optional)
);
```

### Delete File

```tsx
import { deleteFile } from '../lib/storage';

const { success, error } = await deleteFile(
  'profile-pictures',
  'user-id/avatar-123456789.jpg'
);
```

### Get Public URL

```tsx
import { getPublicUrl } from '../lib/storage';

const url = getPublicUrl('profile-pictures', 'user-id/avatar.jpg');
// Use in <img src={url} />
```

---

## 🔒 Security & Permissions

### Profile Pictures
- ✅ **Anyone can view** (public bucket)
- ✅ **Users can upload** their own (folder = user_id)
- ✅ **Users can update/delete** their own only

### Library Resources
- ✅ **All authenticated users can view/download**
- ✅ **Only lecturers/admins can upload**
- ✅ **Only lecturers/admins can delete**

**How it works:**
- Files are organized by user_id for profile pictures
- RLS policies check `auth.uid()` against folder name
- Library uploads check `profiles.role` for admin/lecturer

---

## 📋 File Constraints

### Profile Pictures
| Property | Limit |
|----------|-------|
| Max Size | 2MB |
| Formats  | JPEG, PNG, WebP |
| Recommended | 400x400px square |

### Library Resources
| Property | Limit |
|----------|-------|
| Max Size | 5MB |
| Formats  | PDF, MP4, WebM |

**Validation happens twice:**
1. Client-side (Zod schema) - Immediate feedback
2. Storage policies - Server-side enforcement

---

## 🎨 Customization

### Change Size Limits

Edit `src/lib/storage.ts`:

```tsx
// Profile pictures
if (file.size > 5 * 1024 * 1024) { // Change to 5MB
  return { url: null, error: 'File must be less than 5MB' };
}

// Library resources
if (file.size > 10 * 1024 * 1024) { // Change to 10MB
  return { resourceId: null, error: 'File must be less than 10MB' };
}
```

### Add New Bucket

1. Add SQL in `storage_setup.sql`:
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false); -- private bucket
```

2. Create policies as shown in `storage_setup.sql`

3. Use storage functions from `storage.ts`

---

## 📊 Storage Usage

### Check Current Usage

**Supabase Dashboard → Storage → Settings**
- Free tier: 1GB storage
- Each file counts toward total

### Optimize Storage

1. **Image Compression** - Compress before upload
2. **Delete old files** - Remove unused avatars
3. **Use CDN** - Supabase serves files via CDN

---

## 🐛 Troubleshooting

### Upload Fails with "Policy Violation"

**Solution:**
- Check RLS policies are created (`storage_setup.sql`)
- Verify user is authenticated (`auth.uid()` returns value)
- For library uploads, check user role is 'lecturer' or 'admin'

### Files Not Showing

**Solution:**
- Verify bucket is created in Supabase Dashboard
- Check `getPublicUrl` returns valid URL
- Ensure bucket is set to `public: true` for avatars

### Download Not Working

**Solution:**
- Check file path is correct (use exact path from upload)
- Verify RLS policy allows SELECT on bucket
- Try opening URL directly in browser to test

---

## 🔗 Integration Points

### With Profile Settings
```tsx
// Add to StudentSettings.tsx
import ProfilePictureUpload from '../components/ProfilePictureUpload';
```

### With Library Page
```tsx
// Add to StudentLibrary.tsx
import { LibraryResourceCard } from '../components/LibraryResourceUpload';
```

### With Admin Dashboard
```tsx
// Add to admin page (future)
import LibraryResourceUpload from '../components/LibraryResourceUpload';
```

---

## ✅ Complete Example

```tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfilePictureUpload from '../components/ProfilePictureUpload';
import LibraryResourceUpload, { LibraryResourceCard } from '../components/LibraryResourceUpload';
import { supabase } from '../lib/supabase';

export default function ExamplePage() {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function loadResources() {
      const { data } = await supabase
        .from('library_resources')
        .select('*')
        .limit(10);
      
      setResources(data || []);
    }
    loadResources();
  }, []);

  const isAdmin = user?.role === 'admin' || user?.role === 'lecturer';

  return (
    <div className="p-8">
      {/* Profile Picture Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Your Profile</h2>
        <ProfilePictureUpload
          currentAvatarUrl={user?.avatar_url}
          onUploadSuccess={(url) => console.log('Avatar updated!', url)}
        />
      </section>

      {/* Library Upload (Admins Only) */}
      {isAdmin && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Upload Resource</h2>
          <LibraryResourceUpload />
        </section>
      )}

      {/* Library Resources */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Library</h2>
        <div className="grid gap-4">
          {resources.map((resource) => (
            <LibraryResourceCard
              key={resource.id}
              resource={resource}
              showActions={isAdmin}
              onDelete={(id) => {
                setResources(prev => prev.filter(r => r.id !== id));
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
```

---

**Your file upload system is ready!** Run `storage_setup.sql` in Supabase and start using the components. 🎉
