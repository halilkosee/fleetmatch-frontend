import { Link, useLocation } from 'react-router-dom';
import { Clock3 } from 'lucide-react';
import type { CompanyType } from '../features/auth/authApi';

type VerificationState = {
  companyLegalName?: string;
  companyType?: CompanyType;
  ownerEmail?: string;
};

export function VerificationPendingPage() {
  const location = useLocation();
  const state = (location.state ?? {}) as VerificationState;

  return (
    <main className="auth-page">
      <section className="auth-panel status-panel">
        <div className="status-icon">
          <Clock3 aria-hidden="true" />
        </div>

        <div>
          <p className="eyebrow">Verification pending</p>
          <h1>Registration submitted</h1>
        </div>

        <p>
          {state.companyLegalName ? <strong>{state.companyLegalName}</strong> : 'Your company'} is waiting for admin
          verification. The owner account cannot sign in until approval is complete.
        </p>

        <dl className="status-list">
          <div>
            <dt>Company type</dt>
            <dd>{state.companyType === 'FLEET' ? 'Fleet company' : 'Broker'}</dd>
          </div>
          <div>
            <dt>Owner email</dt>
            <dd>{state.ownerEmail ?? 'Submitted owner email'}</dd>
          </div>
          <div>
            <dt>Next step</dt>
            <dd>Admin reviews company details and activates the owner account.</dd>
          </div>
        </dl>

        <Link className="button-link" to="/login">
          Back to sign in
        </Link>
      </section>
    </main>
  );
}
