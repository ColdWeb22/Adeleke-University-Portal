-- ============================================
-- Supabase Storage Bucket Setup
-- ============================================
-- Run this in Supabase SQL Editor to create storage buckets

-- 1. Create profile-pictures bucket (for avatars)
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true);

-- 2. Create library-resources bucket (for PDFs, documents)
INSERT INTO storage.buckets (id, name, public)
VALUES ('library-resources', 'library-resources', true);

-- ============================================
-- Storage Policies
-- ============================================

-- Profile Pictures Policies
-- Allow authenticated users to upload their own profile picture
CREATE POLICY "Users can upload own profile picture"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-pictures' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own profile picture
CREATE POLICY "Users can update own profile picture"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-pictures' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own profile picture
CREATE POLICY "Users can delete own profile picture"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-pictures' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow anyone to view profile pictures (public bucket)
CREATE POLICY "Anyone can view profile pictures"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-pictures');

-- Library Resources Policies
-- Allow anyone to view library resources
CREATE POLICY "Anyone can view library resources"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'library-resources');

-- Allow admins/lecturers to upload library resources
CREATE POLICY "Admins can upload library resources"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'library-resources' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'lecturer')
  )
);

-- Allow admins/lecturers to delete library resources
CREATE POLICY "Admins can delete library resources"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'library-resources' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'lecturer')
  )
);
