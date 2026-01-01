# Form Validation Guide

Complete guide to using React Hook Form + Zod validation in the Adeleke University Portal.

## 📦 What's Installed

- ✅ **react-hook-form** - Form state management
- ✅ **zod** - Schema validation
- ✅ **@hookform/resolvers** - Bridge between RHF and Zod

---

## 🎯 Validation Rules

All validation schemas are in `src/lib/validations.ts`:

### Authentication

**Signup:**
- Full name: 2-100 chars, letters and spaces only
- Email: Valid email format, lowercased
- Password: Min 6 chars, must have uppercase, lowercase, and number
- Role: Must be 'student' or 'lecturer'

**Login:**
- Email: Valid email format
- Password: Required (no min length for login)

### Payments

- Amount: Must be positive, max 10M, 2 decimal places max
- Description: 3-200 characters
- Payment Type: Must be 'tuition', 'hostel', 'library', or 'other'

### Course Enrollment

- Course ID: Must be valid UUID
- Semester: Must be 'first' or 'second'
- Academic Year: Format YYYY/YYYY (e.g., 2023/2024)
- Credit Limit: 1-24 units per semester

### Profile Updates

- Phone: Nigerian format (+234 or 0, followed by 7-9xxxxxxxxx)
- Address: 10-500 characters

### File Uploads

**Documents:**
- Max size: 5MB
- Allowed types: PDF, JPEG, PNG

**Avatar:**
- Max size: 2MB
- Allowed types: JPEG, PNG, WebP

### Grade Entry (Lecturers)

- Midterm: 0-30 points
- Assignment: 0-20 points
- Final: 0-50 points
- **Total cannot exceed 100**

---

## 🔨 How to Use

### Basic Example (Login Form)

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../lib/validations';
import { toast } from 'sonner';

function LoginForm() {
  // Initialize form with Zod validation
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Submit handler (only called if validation passes)
  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password);
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Email Input */}
      <input
        {...form.register('email')}
        type="email"
        placeholder="Email"
      />
      {form.formState.errors.email && (
        <p className="text-red-400 text-xs">
          {form.formState.errors.email.message}
        </p>
      )}

      {/* Password Input */}
      <input
        {...form.register('password')}
        type="password"
        placeholder="Password"
      />
      {form.formState.errors.password && (
        <p className="text-red-400 text-xs">
          {form.formState.errors.password.message}
        </p>
      )}

      <button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
}
```

---

## 📝 Common Patterns

### 1. Payment Form with Validation

```tsx
import { paymentSchema, PaymentFormData } from '../lib/validations';

function PaymentForm() {
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: 0,
      description: '',
      paymentType: 'tuition',
    },
  });

  const onSubmit = async (data: PaymentFormData) => {
    // Data is validated! Safe to use
    console.log(data.amount); // number
    console.log(data.paymentType); // 'tuition' | 'hostel' | 'library' | 'other'
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input
        {...form.register('amount', { valueAsNumber: true })}
        type="number"
        step="0.01"
        placeholder="Amount (₦)"
      />
      {form.formState.errors.amount && (
        <p className="text-red-400">{form.formState.errors.amount.message}</p>
      )}

      <select {...form.register('paymentType')}>
        <option value="tuition">Tuition</option>
        <option value="hostel">Hostel</option>
        <option value="library">Library</option>
        <option value="other">Other</option>
      </select>

      <button type="submit">Pay Now</button>
    </form>
  );
}
```

### 2. File Upload with Validation

```tsx
import { fileUploadSchema, FileUploadFormData } from '../lib/validations';

function DocumentUpload() {
  const form = useForm<FileUploadFormData>({
    resolver: zodResolver(fileUploadSchema),
  });

  const onSubmit = async (data: FileUploadFormData) => {
    const file = data.file;
    // File is validated (size, type)
    const formData = new FormData();
    formData.append('file', file);
    
    await uploadFile(formData);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input
        type="file"
        {...form.register('file', {
          onChange: (e) => {
            // React Hook Form handles file inputs
            const file = e.target.files?.[0];
            if (file) form.setValue('file', file);
          },
        })}
        accept="application/pdf,image/jpeg,image/png"
      />
      {form.formState.errors.file && (
        <p className="text-red-400">{form.formState.errors.file.message}</p>
      )}

      <button type="submit">Upload</button>
    </form>
  );
}
```

### 3. Grade Entry Form (Lecturers)

```tsx
import { gradeEntrySchema, GradeEntryFormData } from '../lib/validations';

function GradeForm() {
  const form = useForm<GradeEntryFormData>({
    resolver: zodResolver(gradeEntrySchema),
    defaultValues: {
      midtermScore: 0,
      assignmentScore: 0,
      finalScore: 0,
    },
  });

  // Watch for changes to calculate total
  const scores = form.watch();
  const total = (scores.midtermScore || 0) + (scores.assignmentScore || 0) + (scores.finalScore || 0);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label>Midterm (Max 30)</label>
        <input
          {...form.register('midtermScore', { valueAsNumber: true })}
          type="number"
          max="30"
        />
      </div>

      <div>
        <label>Assignment (Max 20)</label>
        <input
          {...form.register('assignmentScore', { valueAsNumber: true })}
          type="number"
          max="20"
        />
      </div>

      <div>
        <label>Final Exam (Max 50)</label>
        <input
          {...form.register('finalScore', { valueAsNumber: true })}
          type="number"
          max="50"
        />
      </div>

      <p className={total > 100 ? 'text-red-400' : 'text-green-400'}>
        Total: {total}/100
      </p>

      <button type="submit" disabled={total > 100}>
        Submit Grade
      </button>
    </form>
  );
}
```

---

## 🎨 Styling Error Messages

### Inline Errors (Recommended)

```tsx
{form.formState.errors.email && (
  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
    <AlertCircle size={12} />
    {form.formState.errors.email.message}
  </p>
)}
```

### Toast Errors (Alternative)

```tsx
import { toast } from 'sonner';

const onSubmit = async (data) => {
  try {
    await submit(data);
    toast.success('Saved!');
  } catch (error) {
    toast.error(error.message);
  }
};
```

---

## 🔄 Advanced Features

### 1. Conditional Validation

```tsx
const schema = z.object({
  role: z.enum(['student', 'lecturer']),
  matricNumber: z.string().optional(),
  staffId: z.string().optional(),
}).refine((data) => {
  if (data.role === 'student') {
    return !!data.matricNumber;
  }
  if (data.role === 'lecturer') {
    return !!data.staffId;
  }
  return true;
}, {
  message: 'Required field missing',
});
```

### 2. Custom Validation

```tsx
const customSchema = z.object({
  email: z.string().email().refine(
    async (email) => {
      // Check if email already exists
      const exists = await checkEmailExists(email);
      return !exists;
    },
    { message: 'Email already registered' }
  ),
});
```

### 3. Reset Form After Submit

```tsx
const onSubmit = async (data) => {
  await saveData(data);
  form.reset(); // Clear all fields
  toast.success('Form submitted!');
};
```

### 4. Set Specific Field Errors

```tsx
try {
  await signIn(data.email, data.password);
} catch (error) {
  // Set error on specific field
  form.setError('password', {
    type: 'manual',
    message: 'Invalid password',
  });
}
```

### 5. Watch Field Changes

```tsx
// Watch single field
const email = form.watch('email');

// Watch all fields
const formValues = form.watch();

// Watch with callback
useEffect(() => {
  const subscription = form.watch((value, { name, type }) => {
    console.log(value, name, type);
  });
  return () => subscription.unsubscribe();
}, [form]);
```

---

## ✅ Form States

React Hook Form provides useful states:

```tsx
const {
  isSubmitting,  // Form is currently submitting
  isSubmitted,   // Form has been submitted
  isDirty,       // User has changed any field
  isValid,       // All validations pass
  errors,        // Current validation errors
} = form.formState;

// Use in UI
<button 
  type="submit" 
  disabled={!isValid || isSubmitting}
>
  {isSubmitting ? 'Saving...' : 'Save'}
</button>
```

---

## 🚨 Common Errors & Solutions

### Error: "valueAsNumber not working"
```tsx
// ❌ Wrong
<input {...form.register('amount')} type="number" />

// ✅ Correct
<input {...form.register('amount', { valueAsNumber: true })} type="number" />
```

### Error: "File validation not working"
```tsx
// ❌ Wrong
<input {...form.register('file')} type="file" />

// ✅ Correct
<input
  type="file"
  {...form.register('file', {
    onChange: (e) => {
      const file = e.target.files?.[0];
      if (file) form.setValue('file', file);
    },
  })}
/>
```

### Error: "Form doesn't submit"
```tsx
// Make sure you're using handleSubmit
<form onSubmit={form.handleSubmit(onSubmit)}>
  {/* NOT: <form onSubmit={onSubmit}> */}
</form>
```

---

## 📊 Performance Tips

1. **Use `defaultValues`** - Prevents unnecessary re-renders
2. **Avoid inline schemas** - Define schemas outside components
3. **Use `mode: 'onBlur'`** - Validate on blur instead of every keystroke
4. **Debounce async validation** - Don't validate on every character

```tsx
const form = useForm({
  resolver: zodResolver(schema),
  mode: 'onBlur', // Validate when field loses focus
  defaultValues: { /* ... */ },
});
```

---

## 🎯 Already Implemented

✅ **Login.tsx** - Full validation with inline errors  
✅ **Signup.tsx** - Password strength requirements  
✅ **All Schemas** - Defined in `src/lib/validations.ts`

---

## 🔨 To-Do (Optional)

- [ ] Add validation to Profile Settings page
- [ ] Add validation to Course Registration page  
- [ ] Add grade entry validation for lecturers
- [ ] Add file upload validation for library

Copy the examples above to implement in your components!
