import React, { useState } from "react";
import "./ProviderDashboard.css";

function ProviderDashboard() {

  // Provider information
  const provider = {
    name: "John Smith",
    email: "john@provider.com",
    platforms: ["Amazon Prime", "Netflix", "Disney Plus"]
  };

  // Sample incoming requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      consumerName: "Alexander Richardson",
      consumerEmail: "alexander.richardson@example.com",
      platform: "Netflix",
      from: "2026-07-02T15:00",
      to: "2026-07-02T19:00",
      status: "Pending"
    },
    {
      id: 2,
      consumerName: "Alexis Thomas",
      consumerEmail: "alexis.thomas@example.com",
      platform: "Disney Plus",
      from: "2026-07-03T10:00",
      to: "2026-07-03T14:00",
      status: "Pending"
    },
    {
      id: 3,
      consumerName: "James Peter",
      consumerEmail: "james.peter@example.com",
      platform: "Amazon Prime",
      from: "2026-07-04T12:00",
      to: "2026-07-04T16:00",
      status: "Pending"
    }
  ]);

  // Selected request for popup
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Open popup
  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  // Close popup
  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };

  // Update request status
  const updateRequestStatus = (status) => {
    if (!selectedRequest) return;

    setRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === selectedRequest.id
          ? { ...request, status }
          : request
      )
    );

    setSelectedRequest(null);
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  // Logout
  const handleLogout = () => {
    window.location.href = "/login";
  };

  // Avatar initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  return (
    <div className="provider-dashboard">

      {/* HEADER */}

      <header className="provider-header">

        <div className="brand-section">

          <div className="brand-icon">
            <span>♧</span>
          </div>

          <h1>
            Platform<span>Connect</span>
          </h1>

        </div>

        <div className="provider-header-right">

          <div className="provider-header-info">
            <h3>{provider.name}</h3>
            <p>{provider.email}</p>
          </div>

          <div className="provider-header-avatar">
            {getInitials(provider.name)}
          </div>

          <div className="header-divider"></div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            ⇥ &nbsp; Logout
          </button>

        </div>

      </header>


      {/* MAIN DASHBOARD */}

      <main className="provider-main">

        {/* INCOMING REQUESTS */}

        <section className="requests-card">

          <div className="requests-heading">

            <div>
              <h2>Incoming Requests</h2>

              <p>
                Manage requests from consumers here.
              </p>
            </div>

            <span className="request-count">
              {requests.length} Total
            </span>

          </div>


          {/* REQUEST LIST */}

          <div className="requests-list">

            {requests.length === 0 ? (

              <div className="empty-requests">
                <h3>No requests yet</h3>
                <p>
                  Consumer requests will appear here.
                </p>
              </div>

            ) : (

              requests.map((request) => (

                <div
                  className="request-row"
                  key={request.id}
                >

                  <div className="consumer-avatar">
                    {getInitials(request.consumerName)}
                  </div>

                  <div className="request-info">

                    <div className="request-name-line">

                      <h3>{request.consumerName}</h3>

                      <span
                        className={`request-status ${request.status.toLowerCase()}`}
                      >
                        {request.status}
                      </span>

                    </div>

                    <div className="request-meta">

                      <span>Requested</span>

                      <strong>{request.platform}</strong>

                      <span className="meta-dot">•</span>

                      <span>
                        {new Date(request.from).toLocaleDateString(
                          "en-US",
                          {
                            month: "numeric",
                            day: "numeric",
                            year: "numeric"
                          }
                        )}
                      </span>

                    </div>

                  </div>

                  <button
                    className="view-details-btn"
                    onClick={() => handleViewDetails(request)}
                  >
                    View Details
                  </button>

                </div>

              ))

            )}

          </div>

        </section>


        {/* PROFILE SUMMARY */}

        <aside className="profile-card">

          <div className="profile-heading">

            <div className="profile-icon">
              ♙
            </div>

            <h2>Profile Summary</h2>

          </div>

          <div className="profile-divider"></div>

          <div className="profile-info">

            <label>EMAIL</label>

            <h3>{provider.email}</h3>

          </div>

          <div className="profile-platforms">

            <label>MY PLATFORMS</label>

            <div className="platform-tags">

              {provider.platforms.map((platform) => (
                <span key={platform}>
                  {platform}
                </span>
              ))}

            </div>

          </div>

          <div className="profile-pending">
            <span>Pending Requests</span>
            <strong>{pendingCount}</strong>
          </div>

        </aside>

      </main>


      {/* ==================================
          REQUEST DETAILS POPUP
      ================================== */}

      {selectedRequest && (

        <div
          className="details-overlay"
          onClick={handleCloseDetails}
        >

          <div
            className="details-modal"
            onClick={(event) => event.stopPropagation()}
          >

            {/* POPUP HEADER */}

            <div className="details-header">

              <div className="details-title">

                <h2>Request Details</h2>

                <p>
                  Review the access request and duration below.
                </p>

              </div>

              <span
                className={`details-status ${selectedRequest.status.toLowerCase()}`}
              >
                {selectedRequest.status}
              </span>

              <button
                className="details-close"
                onClick={handleCloseDetails}
                aria-label="Close popup"
              >
                ×
              </button>

            </div>


            {/* POPUP CONTENT */}

            <div className="details-content">

              {/* REQUESTED BY */}

              <div className="requested-user">

                <div className="requested-avatar">
                  {getInitials(selectedRequest.consumerName)}
                </div>

                <div className="requested-user-info">

                  <label>REQUESTED BY</label>

                  <h3>
                    {selectedRequest.consumerName}
                  </h3>

                  <p>
                    {selectedRequest.consumerEmail}
                  </p>

                </div>

              </div>


              {/* PLATFORM REQUESTED */}

              <div className="details-platform-section">

                <label>PLATFORM REQUESTED</label>

                <div className="details-platform-tags">

                  <span>
                    {selectedRequest.platform}
                  </span>

                </div>

              </div>


              {/* DURATION */}

              <div className="details-duration-section">

                <label>DURATION</label>

                <div className="details-date-grid">

                  <div className="details-date-box">

                    <label>
                      <span>▢</span> From
                    </label>

                    <strong>
                      {formatDate(selectedRequest.from)}
                    </strong>

                  </div>

                  <div className="details-date-box">

                    <label>
                      <span>▢</span> To
                    </label>

                    <strong>
                      {formatDate(selectedRequest.to)}
                    </strong>

                  </div>

                </div>

              </div>

            </div>


            {/* POPUP FOOTER */}

            <div className="details-footer">

              {selectedRequest.status === "Pending" ? (

                <>
                  <button
                    className="decline-request-btn"
                    onClick={() => updateRequestStatus("Declined")}
                  >
                    ⊗ &nbsp; Decline
                  </button>

                  <button
                    className="accept-request-btn"
                    onClick={() => updateRequestStatus("Accepted")}
                  >
                    ✓ &nbsp; Accept Request
                  </button>
                </>

              ) : (

                <button
                  className="close-details-btn"
                  onClick={handleCloseDetails}
                >
                  Close
                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ProviderDashboard;