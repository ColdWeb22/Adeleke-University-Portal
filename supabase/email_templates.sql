-- ============================================
-- SMTP Email Templates Configuration Guide
-- ============================================

/*
  To configure custom SMTP for email authentication in Supabase:
  
  1. Go to your Supabase Dashboard
  2. Navigate to Authentication > Email Templates
  3. Enable "Custom SMTP" under Settings > Auth
  
  SMTP Configuration Example (for Gmail):
  - SMTP Host: smtp.gmail.com
  - SMTP Port: 587
  - SMTP User: your-email@gmail.com
  - SMTP Password: your-app-specific-password
  - SMTP Sender Name: Adeleke University Portal
  - SMTP Sender Email: noreply@adelekeuniversity.edu.ng
  
  For production, consider using:
  - SendGrid
  - AWS SES
  - Mailgun
  - Postmark
*/

-- ============================================
-- Email Template: Confirmation Email
-- ============================================
/*
Subject: Confirm Your Adeleke University Portal Account

Body:
<h2>Welcome to Adeleke University Portal!</h2>

<p>Hi {{ .Name }},</p>

<p>Thank you for registering with the Adeleke University Portal. To complete your registration, please confirm your email address by clicking the button below:</p>

<p style="text-align: center;">
  <a href="{{ .ConfirmationURL }}" 
     style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
    Confirm Email
  </a>
</p>

<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p>This link will expire in 24 hours.</p>

<p>If you didn't create an account with us, please ignore this email.</p>

<br>
<p>Best regards,<br>
Adeleke University IT Department</p>

<hr>
<p style="color: #666; font-size: 12px;">
  Adeleke University, Ede, Osun State, Nigeria<br>
  Email: support@adelekeuniversity.edu.ng
</p>
*/

-- ============================================
-- Email Template: Password Reset
-- ============================================
/*
Subject: Reset Your Adeleke University Portal Password

Body:
<h2>Password Reset Request</h2>

<p>Hi {{ .Name }},</p>

<p>We received a request to reset your password for the Adeleke University Portal. Click the button below to create a new password:</p>

<p style="text-align: center;">
  <a href="{{ .ConfirmationURL }}" 
     style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
    Reset Password
  </a>
</p>

<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p>This link will expire in 1 hour.</p>

<p><strong>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</strong></p>

<br>
<p>Best regards,<br>
Adeleke University IT Department</p>

<hr>
<p style="color: #666; font-size: 12px;">
  Adeleke University, Ede, Osun State, Nigeria<br>
  Email: support@adelekeuniversity.edu.ng
</p>
*/

-- ============================================
-- Email Template: Magic Link
-- ============================================
/*
Subject: Your Adeleke University Portal Login Link

Body:
<h2>Sign in to Your Account</h2>

<p>Hi {{ .Name }},</p>

<p>Click the button below to sign in to your Adeleke University Portal account:</p>

<p style="text-align: center;">
  <a href="{{ .ConfirmationURL }}" 
     style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
    Sign In
  </a>
</p>

<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p>This link will expire in 1 hour.</p>

<p>If you didn't request this link, please ignore this email.</p>

<br>
<p>Best regards,<br>
Adeleke University IT Department</p>

<hr>
<p style="color: #666; font-size: 12px;">
  Adeleke University, Ede, Osun State, Nigeria<br>
  Email: support@adelekeuniversity.edu.ng
</p>
*/

-- ============================================
-- Email Template: Email Change
-- ============================================
/*
Subject: Confirm Your New Email Address

Body:
<h2>Email Address Change</h2>

<p>Hi {{ .Name }},</p>

<p>You recently requested to change your email address for your Adeleke University Portal account. To confirm this change, please click the button below:</p>

<p style="text-align: center;">
  <a href="{{ .ConfirmationURL }}" 
     style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
    Confirm New Email
  </a>
</p>

<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p>This link will expire in 24 hours.</p>

<p><strong>If you didn't request this change, please contact support immediately.</strong></p>

<br>
<p>Best regards,<br>
Adeleke University IT Department</p>

<hr>
<p style="color: #666; font-size: 12px;">
  Adeleke University, Ede, Osun State, Nigeria<br>
  Email: support@adelekeuniversity.edu.ng
</p>
*/
