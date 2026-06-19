import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, UserRound } from 'lucide-react';
import { authApi } from '../features/auth/authApi';
import type { CompanyType, RegisterRequest } from '../features/auth/authApi';

type RegisterFormState = RegisterRequest & {
  confirmPassword: string;
};

const initialFormState: RegisterFormState = {
  companyLegalName: '',
  companyDbaName: '',
  companyEmail: '',
  companyPhone: '',
  companyType: 'BROKER',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterFormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function updateField<K extends keyof RegisterFormState>(field: K, value: RegisterFormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      const payload: RegisterRequest = {
        companyLegalName: form.companyLegalName,
        companyDbaName: form.companyDbaName,
        companyEmail: form.companyEmail,
        companyPhone: form.companyPhone,
        companyType: form.companyType,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      };
      await authApi.register(payload);
      navigate('/verification-pending', {
        state: {
          companyLegalName: form.companyLegalName,
          companyType: form.companyType,
          ownerEmail: form.email,
        },
      });
    } catch {
      setError('Registration could not be submitted. Check the details and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page onboarding-page">
      <form className="onboarding-panel" onSubmit={handleSubmit}>
        <div className="onboarding-header">
          <p className="eyebrow">Company onboarding</p>
          <h1>Create your FleetMatch account</h1>
          <p>Register the company and owner account for admin verification.</p>
        </div>

        <section className="form-section" aria-labelledby="company-section">
          <div className="form-section-title">
            <Building2 aria-hidden="true" />
            <h2 id="company-section">Company</h2>
          </div>

          <label>
            Company type
            <select
              value={form.companyType}
              onChange={(event) => updateField('companyType', event.target.value as CompanyType)}
              required
            >
              <option value="BROKER">Broker</option>
              <option value="FLEET">Fleet company</option>
            </select>
          </label>

          <label>
            Legal name
            <input
              value={form.companyLegalName}
              onChange={(event) => updateField('companyLegalName', event.target.value)}
              maxLength={255}
              required
            />
          </label>

          <label>
            DBA name
            <input value={form.companyDbaName} onChange={(event) => updateField('companyDbaName', event.target.value)} />
          </label>

          <div className="form-grid">
            <label>
              Company email
              <input
                type="email"
                value={form.companyEmail}
                onChange={(event) => updateField('companyEmail', event.target.value)}
                required
              />
            </label>

            <label>
              Company phone
              <input value={form.companyPhone} onChange={(event) => updateField('companyPhone', event.target.value)} />
            </label>
          </div>
        </section>

        <section className="form-section" aria-labelledby="owner-section">
          <div className="form-section-title">
            <UserRound aria-hidden="true" />
            <h2 id="owner-section">Owner</h2>
          </div>

          <div className="form-grid">
            <label>
              First name
              <input
                value={form.firstName}
                onChange={(event) => updateField('firstName', event.target.value)}
                maxLength={100}
                required
              />
            </label>

            <label>
              Last name
              <input
                value={form.lastName}
                onChange={(event) => updateField('lastName', event.target.value)}
                maxLength={100}
                required
              />
            </label>
          </div>

          <div className="form-grid">
            <label>
              Owner email
              <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} required />
            </label>

            <label>
              Owner phone
              <input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
            </label>
          </div>

          <div className="form-grid">
            <label>
              Password
              <input
                type="password"
                value={form.password}
                onChange={(event) => updateField('password', event.target.value)}
                minLength={6}
                maxLength={100}
                required
              />
            </label>

            <label>
              Confirm password
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(event) => updateField('confirmPassword', event.target.value)}
                minLength={6}
                maxLength={100}
                required
              />
            </label>
          </div>
        </section>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="form-actions">
          <Link to="/login">Already registered?</Link>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit for verification'}
          </button>
        </div>
      </form>
    </main>
  );
}
