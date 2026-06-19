import { MessageSquare, PackageCheck, Route, UsersRound } from 'lucide-react';

const metrics = [
  { label: 'Active loads', value: '0', icon: Route },
  { label: 'Booked loads', value: '0', icon: PackageCheck },
  { label: 'Conversations', value: '0', icon: MessageSquare },
  { label: 'Companies', value: '0', icon: UsersRound },
];

export function DashboardPage() {
  return (
    <section className="content-section">
      <div className="section-header">
        <h2>Dashboard</h2>
        <p>Frontend foundation is ready for backend integration.</p>
      </div>

      <div className="metric-grid">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article className="metric-card" key={metric.label}>
              <Icon aria-hidden="true" />
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          );
        })}
      </div>
    </section>
  );
}
