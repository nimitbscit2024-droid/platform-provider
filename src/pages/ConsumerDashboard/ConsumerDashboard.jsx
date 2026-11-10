import React from 'react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Active bookings', value: '12' },
  { label: 'Confirmed visits', value: '7' },
  { label: 'Saved this month', value: '$420' },
];

const services = ['Home cleaning', 'Plumbing', 'Electrical services'];

function ConsumerDashboard() {
  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <h2>Consumer</h2>
        <nav>
          <Link to="/consumer-dashboard">Overview</Link>
          <Link to="/">Log out</Link>
        </nav>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Welcome back, Sam</h1>
          </div>
          <button className="primary-button">Book a service</button>
        </header>

        <section className="stats-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <article className="panel">
            <h3>Popular services</h3>
            <ul className="list">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <h3>Upcoming appointments</h3>
            <div className="appointment-card">
              <p>Tue, 10:30 AM</p>
              <strong>Plumbing inspection</strong>
              <span>Provider: Ace Fixers</span>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default ConsumerDashboard;