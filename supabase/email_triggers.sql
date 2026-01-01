-- ============================================
-- Email Notification Functions
-- ============================================
-- Run this in Supabase SQL Editor after setting up SMTP

-- Function to send payment confirmation email
CREATE OR REPLACE FUNCTION send_payment_confirmation_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Only send email when payment status changes to 'success'
  IF NEW.status = 'success' AND OLD.status != 'success' THEN
    PERFORM
      net.http_post(
        url := current_setting('app.settings.edge_function_url') || '/send-email',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
        ),
        body := jsonb_build_object(
          'type', 'payment_confirmation',
          'to', (SELECT email FROM profiles WHERE id = NEW.student_id),
          'data', jsonb_build_object(
            'student_name', (SELECT full_name FROM profiles WHERE id = NEW.student_id),
            'amount', NEW.amount,
            'payment_type', NEW.payment_type,
            'reference', NEW.reference,
            'payment_date', NEW.updated_at
          )
        )
      );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for payment confirmation emails
DROP TRIGGER IF EXISTS payment_confirmation_email_trigger ON payments;
CREATE TRIGGER payment_confirmation_email_trigger
  AFTER UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION send_payment_confirmation_email();


-- Function to send grade notification email
CREATE OR REPLACE FUNCTION send_grade_notification_email()
RETURNS TRIGGER AS $$
DECLARE
  student_id_var uuid;
  student_email text;
  student_name text;
  course_info record;
BEGIN
  -- Get student info from enrollment
  SELECT 
    e.student_id,
    p.email,
    p.full_name,
    c.code,
    c.title
  INTO student_id_var, student_email, student_name, course_info
  FROM enrollments e
  JOIN profiles p ON p.id = e.student_id
  JOIN courses c ON c.id = e.course_id
  WHERE e.id = NEW.enrollment_id;

  -- Send email notification
  PERFORM
    net.http_post(
      url := current_setting('app.settings.edge_function_url') || '/send-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := jsonb_build_object(
        'type', 'grade_notification',
        'to', student_email,
        'data', jsonb_build_object(
          'student_name', student_name,
          'course_code', course_info.code,
          'course_title', course_info.title,
          'total_score', NEW.total_score,
          'letter_grade', NEW.letter_grade
        )
      )
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for grade notification emails
DROP TRIGGER IF EXISTS grade_notification_email_trigger ON grades;
CREATE TRIGGER grade_notification_email_trigger
  AFTER INSERT OR UPDATE OF total_score, letter_grade ON grades
  FOR EACH ROW
  WHEN (NEW.total_score IS NOT NULL AND NEW.letter_grade IS NOT NULL)
  EXECUTE FUNCTION send_grade_notification_email();


-- Function to send enrollment confirmation email
CREATE OR REPLACE FUNCTION send_enrollment_confirmation_email()
RETURNS TRIGGER AS $$
DECLARE
  student_email text;
  student_name text;
  course_info record;
BEGIN
  IF NEW.status = 'enrolled' THEN
    -- Get student and course info
    SELECT 
      p.email,
      p.full_name,
      c.code,
      c.title,
      c.units
    INTO student_email, student_name, course_info
    FROM profiles p, courses c
    WHERE p.id = NEW.student_id AND c.id = NEW.course_id;

    -- Send email notification
    PERFORM
      net.http_post(
        url := current_setting('app.settings.edge_function_url') || '/send-email',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
        ),
        body := jsonb_build_object(
          'type', 'enrollment_confirmation',
          'to', student_email,
          'data', jsonb_build_object(
            'student_name', student_name,
            'course_code', course_info.code,
            'course_title', course_info.title,
            'course_units', course_info.units,
            'semester', NEW.semester,
            'academic_year', NEW.academic_year
          )
        )
      );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for enrollment confirmation emails
DROP TRIGGER IF EXISTS enrollment_confirmation_email_trigger ON enrollments;
CREATE TRIGGER enrollment_confirmation_email_trigger
  AFTER INSERT ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION send_enrollment_confirmation_email();


-- ============================================
-- Configuration
-- ============================================
-- Set these values in your Supabase project settings or .env

-- Example (adjust for your setup):
-- ALTER DATABASE postgres SET app.settings.edge_function_url = 'https://your-project.supabase.co/functions/v1';
-- ALTER DATABASE postgres SET app.settings.service_role_key = 'your-service-role-key';

-- Note: For security, use Supabase Vault to store sensitive values
-- https://supabase.com/docs/guides/database/vault
