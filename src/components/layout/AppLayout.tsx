import { Link, Outlet } from 'react-router-dom';
import { LogIn, Truck } from 'lucide-react';

export function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/dashboard">
          <Truck aria-hidden="true" />
          <span>FleetMatch</span>
        </Link>
        <nav className="nav-list" aria-label="Main navigation">
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Operations</p>
            <h1>FleetMatch</h1>
          </div>
          <Link className="icon-button" to="/login" aria-label="Sign in">
            <LogIn aria-hidden="true" />
          </Link>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
