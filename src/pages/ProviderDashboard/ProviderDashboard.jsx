import React from 'react';
import { Link } from 'react-router-dom';

const metrics = [
  { label: 'Requests today', value: '18' },
  { label: 'Completed jobs', value: '29' },
  { label: 'Earnings', value: '$2,140' },
];

function ProviderDashboard() {
  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <h2>Provider</h2>
        <nav>
          <Link to="/provider-dashboard">Overview</Link>
          <Link to="/">Log out</Link>
        </nav>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Provider overview</h1>
          </div>
          <button className="primary-button">Add availability</button>
        </header>

        <section className="stats-grid">
          {metrics.map((metric) => (
            <article key={metric.label} className="stat-card">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <article className="panel">
            <h3>Recent requests</h3>
            <ul className="list">
              <li>Kitchen renovation — awaiting confirmation</li>
              <li>Emergency repair — new</li>
              <li>Cleaning service — scheduled</li>
            </ul>
          </article>

          <article className="panel">
            <h3>Calendar</h3>
            <div className="appointment-card">
              <p>Today</p>
              <strong>2:00 PM - 4:00 PM</strong>
              <span>Home electrical check</span>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default ProviderDashboard;