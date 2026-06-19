import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <Link to="/dashboard">Back to dashboard</Link>
      </section>
    </main>
  );
}
