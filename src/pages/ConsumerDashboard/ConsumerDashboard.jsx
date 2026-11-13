import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConsumerDashboard.css";

function ConsumerDashboard() {
  const navigate = useNavigate();

  // Consumer details
  const consumer = {
    name: "David Villa",
    email: "davidvilla@gmail.com",
    initials: "DV",
  };

  // Sample registered providers
  const [providers] = useState([
    {
      id: 1,
      name: "John Smith",
      initials: "JS",
      email: "john@provider.com",
      phone: "+1 (555) 123-4567",
      address: "123 Provider Lane, NY",
      platforms: ["Amazon Prime", "Netflix"],
    },
    {
      id: 2,
      name: "Orangutan Johny  ",
      initials: "SJ",
      email: "Orangutan@provider.com",
      phone: "+1 (555) 987-6543",
      address: "456 Main Street, NY",
      platforms: ["Disney Plus", "Netflix"],
    },
  ]);

  // Request form states
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Submitted requests
  const [requests, setRequests] = useState([]);

  // Logout
  const handleLogout = () => {
    navigate("/login");
  };

  // Open Create Request popup
  const handleCreateRequest = (provider) => {
    setSelectedProvider(provider);
    setSelectedPlatforms([]);
    setFromDate("");
    setToDate("");
  };

  // Close popup
  const handleCloseModal = () => {
    setSelectedProvider(null);
    setSelectedPlatforms([]);
    setFromDate("");
    setToDate("");
  };

  // Select or deselect platforms
  const handlePlatformSelect = (platform) => {
    setSelectedPlatforms((previous) =>
      previous.includes(platform)
        ? previous.filter((item) => item !== platform)
        : [...previous, platform]
    );
  };

  // Submit service request
  const handleSubmitRequest = (event) => {
    event.preventDefault();

    if (
      !selectedProvider ||
      selectedPlatforms.length === 0 ||
      !fromDate ||
      !toDate
    ) {
      alert("Please complete all required fields.");
      return;
    }

    if (new Date(toDate) <= new Date(fromDate)) {
      alert("End date and time must be after start date and time.");
      return;
    }

    const newRequest = {
      id: Date.now(),
      provider: selectedProvider.name,
      providerId: selectedProvider.id,
      platforms: [...selectedPlatforms],
      from: fromDate,
      to: toDate,
      status: "Pending",
    };

    setRequests((previous) => [...previous, newRequest]);

    alert("Your request has been submitted successfully!");

    handleCloseModal();
  };

  return (
    <div className="consumer-dashboard">

      {/* NAVIGATION BAR */}

      <header className="consumer-navbar">

        <div className="consumer-brand">

          <div className="consumer-brand-icon">
            <span>▣</span>
          </div>

          <h1>
            Platform<span>Connect</span>
          </h1>

        </div>

        <div className="consumer-navbar-right">

          <div className="consumer-info">
            <h4>{consumer.name}</h4>
            <p>{consumer.email}</p>
          </div>

          <div className="consumer-avatar">
            {consumer.initials}
          </div>

          <div className="consumer-divider"></div>

          <button
            className="consumer-logout"
            onClick={handleLogout}
            type="button"
          >
            <span>⇥</span>
            Logout
          </button>

        </div>

      </header>


      {/* MAIN CONTENT */}

      <main className="consumer-main">

        {/* PAGE HEADING */}

        <div className="providers-heading">

          <div>
            <h2>Available Providers</h2>

            <p>
              Browse and request services from registered platform providers.
            </p>
          </div>

          <span className="provider-count">
            {providers.length} Providers Found
          </span>

        </div>


        {/* PROVIDER CARDS */}

        <div className="provider-grid">

          {providers.map((provider) => (

            <div
              className="consumer-provider-card"
              key={provider.id}
            >

              {/* PROVIDER HEADER */}

              <div className="provider-card-header">

                <div className="provider-avatar">
                  {provider.initials}
                </div>

                <h3>{provider.name}</h3>

              </div>


              {/* CONTACT DETAILS */}

              <div className="provider-contact">

                <div className="contact-item">
                  <span className="contact-icon">✉</span>
                  <span>{provider.email}</span>
                </div>

                <div className="contact-item">
                  <span className="contact-icon">☎</span>
                  <span>{provider.phone}</span>
                </div>

                <div className="contact-item">
                  <span className="contact-icon">⌖</span>
                  <span>{provider.address}</span>
                </div>

              </div>


              {/* SUPPORTED PLATFORMS */}

              <div className="supported-platforms">

                <label>SUPPORTED PLATFORMS</label>

                <div className="consumer-platform-tags">

                  {provider.platforms.map((platform) => (

                    <span key={platform}>
                      {platform}
                    </span>

                  ))}

                </div>

              </div>


              {/* CREATE REQUEST BUTTON */}

              <button
                className="create-request-button"
                onClick={() => handleCreateRequest(provider)}
                type="button"
              >
                <span>⊕</span>
                Create Request
              </button>

            </div>

          ))}

        </div>


        {/* MY REQUESTS SECTION */}

        {requests.length > 0 && (

          <section className="my-requests-section">

            <h2>My Requests</h2>

            <p>Track your submitted service requests.</p>

            <div className="my-requests-list">

              {requests.map((request) => (

                <div
                  className="my-request-item"
                  key={request.id}
                >

                  <div className="my-request-details">

                    <h4>{request.provider}</h4>

                    <p>
                      Platforms: {request.platforms.join(", ")}
                    </p>

                    <p>
                      From: {new Date(request.from).toLocaleString()}
                    </p>

                    <p>
                      To: {new Date(request.to).toLocaleString()}
                    </p>

                  </div>

                  <span className="consumer-pending">
                    {request.status}
                  </span>

                </div>

              ))}

            </div>

          </section>

        )}

      </main>


      {/* =================================
          CREATE REQUEST POPUP
      ================================= */}

      {selectedProvider && (

        <div
          className="request-overlay"
          onClick={handleCloseModal}
        >

          <div
            className="request-modal"
            onClick={(event) => event.stopPropagation()}
          >

            {/* MODAL HEADER */}

            <div className="request-modal-header">

              <div>

                <h2>Create Request</h2>

                <p>
                  Select a platform and time to request access from{" "}
                  <strong>{selectedProvider.name}</strong>.
                </p>

              </div>

              <button
                type="button"
                className="request-close"
                onClick={handleCloseModal}
                aria-label="Close popup"
              >
                ×
              </button>

            </div>


            {/* REQUEST FORM */}

            <form onSubmit={handleSubmitRequest}>

              <div className="request-modal-content">


                {/* PLATFORM SELECTION */}

                <div className="request-section">

                  <label className="request-section-label">
                    AVAILABLE PLATFORMS <span>*</span>
                  </label>

                  <div className="request-platform-grid">

                    {selectedProvider.platforms.map((platform) => (

                      <button
                        type="button"
                        key={platform}
                        className={`request-platform-option ${
                          selectedPlatforms.includes(platform)
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => handlePlatformSelect(platform)}
                        aria-pressed={selectedPlatforms.includes(platform)}
                      >

                        <span>{platform}</span>

                        {selectedPlatforms.includes(platform) && (
                          <span className="platform-check">✓</span>
                        )}

                      </button>

                    ))}

                  </div>

                </div>


                {/* TIME DURATION */}

                <div className="request-section">

                  <label className="request-section-label">
                    TIME DURATION <span>*</span>
                  </label>

                  <div className="request-date-grid">

                    {/* FROM DATE */}

                    <div className="request-date-field">

                      <label htmlFor="fromDate">From</label>

                      <input
                        type="datetime-local"
                        id="fromDate"
                        value={fromDate}
                        onChange={(event) =>
                          setFromDate(event.target.value)
                        }
                        required
                      />

                    </div>


                    {/* TO DATE */}

                    <div className="request-date-field">

                      <label htmlFor="toDate">To</label>

                      <input
                        type="datetime-local"
                        id="toDate"
                        value={toDate}
                        min={fromDate || undefined}
                        onChange={(event) =>
                          setToDate(event.target.value)
                        }
                        required
                      />

                    </div>

                  </div>

                </div>

              </div>


              {/* MODAL FOOTER */}

              <div className="request-modal-footer">

                <button
                  type="submit"
                  className="request-submit-button"
                  disabled={
                    selectedPlatforms.length === 0 ||
                    !fromDate ||
                    !toDate ||
                    new Date(toDate) <= new Date(fromDate)
                  }
                >
                  Submit Request
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default ConsumerDashboard;