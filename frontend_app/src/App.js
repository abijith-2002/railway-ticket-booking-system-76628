import React, { useState, useEffect } from "react";
import "./App.css";

// Color palette from requirements
const COLORS = {
  primary: "#1976d2",
  secondary: "#424242",
  accent: "#ffd600",
};

// Helper for minimal API state (for demo purposes)
const demoUser = { id: 1, name: "John Doe", email: "john@example.com" };
const demoBookings = [
  {
    id: "BKG1",
    train: "Fast Express",
    source: "Delhi",
    destination: "Mumbai",
    date: "2024-07-01",
    seat: "B2-16",
    status: "Confirmed",
  },
  {
    id: "BKG2",
    train: "Deccan Queen",
    source: "Pune",
    destination: "Mumbai",
    date: "2024-07-05",
    seat: "A1-03",
    status: "Cancelled",
  },
];
const demoTrains = [
  {
    id: "T1",
    name: "Fast Express",
    source: "Delhi",
    destination: "Mumbai",
    date: "2024-07-01",
    availableSeats: [
      "B2-10",
      "B2-12",
      "B2-14",
      "B2-16",
      "C1-06",
      "C1-07",
      "C1-08",
    ],
  },
  {
    id: "T2",
    name: "Evening Rajdhani",
    source: "Delhi",
    destination: "Mumbai",
    date: "2024-07-01",
    availableSeats: ["A1-01", "A1-02", "A1-04", "B3-10"],
  },
  {
    id: "T3",
    name: "Deccan Queen",
    source: "Pune",
    destination: "Mumbai",
    date: "2024-07-05",
    availableSeats: ["A1-03", "A1-10", "A1-14"],
  },
];

// ------------------ Topbar Navigation ------------------

// PUBLIC_INTERFACE
function Navbar({ user, onLogout, onNavigate, currentView }) {
  /**
   * Navigation bar with title, navigation buttons, and user info.
   */
  return (
    <nav style={{
      background: COLORS.primary,
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.75rem 2rem",
      borderBottom: `2px solid ${COLORS.accent}`,
      fontWeight: 500,
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>
      <span onClick={() => onNavigate("search")} style={{
        fontSize: "1.5rem", fontWeight: 700, cursor: "pointer"
      }}>
        🚆 <span style={{ letterSpacing: "0.04em" }}>Railway Booking</span>
      </span>
      <span>
        {user ? (
          <>
            <button className={currentView==="search" ? "nav-selected" : "nav-btn"} onClick={() => onNavigate("search")}>
              Find Trains
            </button>
            <button className={currentView==="bookings" ? "nav-selected" : "nav-btn"} onClick={() => onNavigate("bookings")}>
              My Bookings
            </button>
            <span style={{ marginLeft: 16, marginRight: 16, fontWeight: 400 }}>
              {user.name}
            </span>
            <button className="nav-btn" onClick={onLogout} style={{ background: COLORS.secondary }}>Logout</button>
          </>
        ) : (
          <>
            <button className={currentView==="login" ? "nav-selected" : "nav-btn"} onClick={() => onNavigate("login")}>Login</button>
            <button className={currentView==="register" ? "nav-selected" : "nav-btn"} onClick={() => onNavigate("register")}>Register</button>
          </>
        )}
      </span>
    </nav>
  );
}

// ------------------ Authentication (Login/Register) ------------------

// PUBLIC_INTERFACE
function LoginForm({ onLogin, onSwitchRegister }) {
  /**
   * Login form for user authentication.
   */
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState("");

  // Emulate API
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (email && password) {
        onLogin(demoUser);
      } else {
        setError("Please enter both email and password.");
      }
      setLoading(false);
    }, 600);
  }

  return (
    <div className="card-centered" style={{ maxWidth: 320 }}>
      <h2 className="form-title">Sign In</h2>
      <form onSubmit={handleSubmit} autoComplete="on">
        <label className="input-label">Email
          <input
            className="input"
            type="email"
            required
            value={email}
            autoFocus
            onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="input-label">Password
          <input className="input"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </label>
        {error && <div className="form-error">{error}</div>}
        <button className="major-btn" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
        <div style={{ marginTop: 12 }}>
          <span style={{ fontSize: 13 }}>New here? </span>
          <button type="button" className="text-link" onClick={onSwitchRegister}>Register</button>
        </div>
      </form>
    </div>
  );
}

// PUBLIC_INTERFACE
function RegisterForm({ onRegister, onSwitchLogin }) {
  /**
   * Registration form for new users.
   */
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setTimeout(() => {
      if (name && email && password) {
        setSuccess(true);
        setTimeout(() => onRegister({ id: 2, name, email }), 1200);
      } else {
        setError("All fields are required.");
      }
      setLoading(false);
    }, 900);
  }

  return (
    <div className="card-centered" style={{ maxWidth: 340 }}>
      <h2 className="form-title">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label className="input-label">Name
          <input className="input" type="text" required value={name}
            onChange={e => setName(e.target.value)} />
        </label>
        <label className="input-label">Email
          <input className="input"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="input-label">Password
          <input className="input"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </label>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">Account created! Logging you in…</div>}
        <button className="major-btn" type="submit" disabled={loading || success}>
          {loading ? "Signing up..." : "Register"}
        </button>
        <div style={{ marginTop: 12 }}>
          <span style={{ fontSize: 13 }}>Already have an account? </span>
          <button type="button" className="text-link" onClick={onSwitchLogin}>Login</button>
        </div>
      </form>
    </div>
  );
}

// ------------------ Search Trains ------------------

// PUBLIC_INTERFACE
function TrainSearch({ onSearch }) {
  /**
   * Train search form allowing search by source, destination, and date.
   */
  const [source, setSource] = useState(""); const [destination, setDestination] = useState(""); const [date, setDate] = useState(""); const [error, setError] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    setError("");
    if (source && destination && date) {
      onSearch({ source, destination, date });
    } else {
      setError("Please fill in all fields.");
    }
  }

  return (
    <div className="card-centered" style={{ maxWidth: 420 }}>
      <h2 className="form-title">Search Trains</h2>
      <form onSubmit={handleSearch} style={{ gap: 0 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <input className="input" type="text" placeholder="Source" value={source}
            style={{ flex: 1 }}
            onChange={e => setSource(e.target.value)} />
          <input className="input" type="text" placeholder="Destination" value={destination}
            style={{ flex: 1 }}
            onChange={e => setDestination(e.target.value)} />
        </div>
        <input className="input" type="date" value={date}
          onChange={e => setDate(e.target.value)} style={{ marginBottom: 10, width: "100%" }} />
        {error && <div className="form-error">{error}</div>}
        <button className="major-btn" type="submit" style={{ width: "100%" }}>
          Search Trains
        </button>
      </form>
    </div>
  );
}

// PUBLIC_INTERFACE
function TrainResults({ trains, onSelectTrain }) {
  /**
   * Displays search results for available trains.
   */
  if (!trains.length) {
    return (
      <div className="card-centered" style={{ maxWidth: 380, minHeight: 60 }}>
        <span style={{ fontSize: 16 }}>No trains found for the selected route.</span>
      </div>
    );
  }

  return (
    <div className="card-centered" style={{ maxWidth: 750, width: "100%" }}>
      <h3 style={{ textAlign: "left" }}>Trains Found</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {trains.map(train => (
          <div className="train-card" key={train.id}>
            <div>
              <span className="train-name">{train.name}</span>
              <span className="train-route">
                {train.source} → {train.destination}
              </span>
              <span className="train-date">{train.date}</span>
            </div>
            <button className="major-btn" onClick={() => onSelectTrain(train)}>
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------ Seat Selection & Booking ------------------

// PUBLIC_INTERFACE
function SeatSelection({ train, onBook, onBack }) {
  /**
   * Lets user select a seat from available ones for chosen train.
   */
  const [seat, setSeat] = useState("");
  const [error, setError] = useState("");

  function handleBook(e) {
    e.preventDefault();
    if (!seat) {
      setError("Please select a seat.");
      return;
    }
    onBook(seat);
  }

  return (
    <div className="card-centered" style={{ maxWidth: 380 }}>
      <h2 className="form-title">{train.name}</h2>
      <div style={{ fontSize: 16, marginBottom: 8 }}>
        {train.source} → {train.destination} <span style={{ color: COLORS.secondary, marginLeft: 10 }}>{train.date}</span>
      </div>
      <form onSubmit={handleBook}>
        <div style={{ marginBottom: 10 }}>Select your seat:</div>
        <div className="seat-container">
          {train.availableSeats.map(s => (
            <label key={s} className={seat === s ? "seat-selected" : "seat-plain"}>
              <input
                type="radio"
                name="seat"
                value={s}
                checked={seat === s}
                onChange={() => (setSeat(s))}
                style={{ display: "none" }}
              />
              {s}
            </label>
          ))}
        </div>
        {error && <div className="form-error">{error}</div>}
        <button className="major-btn" style={{ width: "100%" }} type="submit">
          Book Seat
        </button>
        <button className="minor-btn" style={{ width: "100%", marginTop: 6 }} onClick={onBack} type="button">
          ← Back to results
        </button>
      </form>
    </div>
  );
}

// ------------------ Booking Confirmation ------------------

function BookingSuccess({ booking, onMyBookings, onFindAgain }) {
  /**
   * Shows booking success summary.
   */
  return (
    <div className="card-centered" style={{ maxWidth: 370 }}>
      <h2 className="form-title" style={{ color: COLORS.accent }}>Booking Confirmed!</h2>
      <div style={{ fontSize: 16, margin: "10px 0" }}>
        <b>Train:</b> {booking.train}<br />
        <b>Date:</b> {booking.date}<br />
        <b>Seat:</b> {booking.seat}
      </div>
      <div className="booking-id">
        Ticket ID: <strong>{booking.id}</strong>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <button className="major-btn" onClick={onMyBookings}>Go to My Bookings</button>
        <button className="minor-btn" onClick={onFindAgain}>Book Another Ticket</button>
      </div>
    </div>
  );
}

// ------------------ Booking History ------------------

function BookingHistory({ bookings, onCancelBooking }) {
  /**
   * Displays user's past/future bookings and allows cancellation.
   */
  return (
    <div className="card-centered" style={{ maxWidth: 800 }}>
      <h2>My Bookings</h2>
      {!bookings.length ? (
        <span>You have no bookings yet.</span>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Train</th>
              <th>Route</th>
              <th>Date</th>
              <th>Seat</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {bookings.map(bk => (
              <tr key={bk.id} className={bk.status === "Cancelled" ? "bk-cancelled" : ""}>
                <td>{bk.id}</td>
                <td>{bk.train}</td>
                <td>{bk.source} → {bk.destination}</td>
                <td>{bk.date}</td>
                <td>{bk.seat}</td>
                <td>{bk.status}</td>
                <td>
                  {bk.status === "Confirmed" && (
                    <button className="minor-btn" onClick={() => onCancelBooking(bk.id)}>
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ------------------ Footer ------------------

function Footer() {
  /**
   * Page footer with minimal links and copyright.
   */
  return (
    <footer style={{
      width: "100%",
      padding: "14px 0",
      background: COLORS.secondary,
      color: "#fff",
      textAlign: "center",
      marginTop: "auto",
      position: "relative",
      fontSize: 15,
      letterSpacing: "0.04em"
    }}>
      © {new Date().getFullYear()} Railway Ticket Booking System &mdash; Demo React SPA
    </footer>
  );
}

// ------------------ Main Application Logic and Routing ------------------

// PUBLIC_INTERFACE
function App() {
  /** Main React SPA entry point for the Railway Ticket Booking System. Handles all primary views and feature transitions. */
  // Application state
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState("search"); // "search", "login", "register", "results", "booking", "bookings", "confirmation"
  const [searchResults, setSearchResults] = useState([]);
  const [searchState, setSearchState] = useState(null); // {source, destination, date}
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [theme] = useState("light"); // Enforced light theme

  useEffect(() => {
    // Always apply enforced light theme
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  useEffect(() => {
    // Simulate fetch bookings if logged in
    if (currentUser) {
      setTimeout(() => setUserBookings(demoBookings), 300);
    } else {
      setUserBookings([]);
    }
  }, [currentUser]);

  // ----------------- Auth Handlers ------------------
  // PUBLIC_INTERFACE
  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentView("search");
  };
  // PUBLIC_INTERFACE
  const handleLogout = () => {
    setCurrentUser(null);
    setBookingSuccess(null);
    setSelectedTrain(null);
    setCurrentView("login");
  };
  // PUBLIC_INTERFACE
  const handleRegister = (user) => {
    setCurrentUser(user);
    setCurrentView("search");
  };
  // PUBLIC_INTERFACE
  const handleSwitch = (view) => setCurrentView(view);

  // ----------------- Search/Booking Handlers ------------------
  // PUBLIC_INTERFACE
  const handleTrainSearch = ({ source, destination, date }) => {
    setSearchState({ source, destination, date });
    // Filter trains by exact match (case-insensitive), demo logic
    const trains = demoTrains.filter(
      t =>
        t.source.toLowerCase() === source.trim().toLowerCase() &&
        t.destination.toLowerCase() === destination.trim().toLowerCase() &&
        t.date === date
    );
    setSearchResults(trains);
    setCurrentView("results");
  };
  // PUBLIC_INTERFACE
  const handleSelectTrain = (train) => {
    setSelectedTrain(train);
    setCurrentView("booking");
  };
  // PUBLIC_INTERFACE
  const handleBookSeat = (seat) => {
    // Minimal emulated booking API and update state
    const booking = {
      id: "BKG" + (Math.floor(Math.random() * 9000) + 1000),
      train: selectedTrain.name,
      source: selectedTrain.source,
      destination: selectedTrain.destination,
      date: selectedTrain.date,
      seat,
      status: "Confirmed",
    };
    setUserBookings(bs => [booking, ...bs]);
    setBookingSuccess(booking);
    setCurrentView("confirmation");
  };
  // PUBLIC_INTERFACE
  const handleCancelBooking = (id) => {
    // Minimal emulated cancel: mark status as Cancelled
    setUserBookings(bs => bs.map(b =>
      b.id === id ? { ...b, status: "Cancelled" } : b
    ));
  };

  // ----------------- Main View Routing ------------------
  let MainView;
  if (!currentUser) {
    if (currentView === "register")
      MainView = <RegisterForm onRegister={handleRegister} onSwitchLogin={() => handleSwitch("login")} />;
    else
      MainView = <LoginForm onLogin={handleLogin} onSwitchRegister={() => handleSwitch("register")} />;
  } else {
    // Authenticated routes
    switch (currentView) {
      case "results":
        MainView = (
          <TrainResults
            trains={searchResults}
            onSelectTrain={handleSelectTrain}
          />
        );
        break;
      case "booking":
        MainView = (
          <SeatSelection
            train={selectedTrain}
            onBook={handleBookSeat}
            onBack={() => setCurrentView("results")}
          />
        );
        break;
      case "confirmation":
        MainView = (
          <BookingSuccess
            booking={bookingSuccess}
            onMyBookings={() => setCurrentView("bookings")}
            onFindAgain={() => setCurrentView("search")}
          />
        );
        break;
      case "bookings":
        MainView = (
          <BookingHistory
            bookings={userBookings}
            onCancelBooking={handleCancelBooking}
          />
        );
        break;
      case "search":
      default:
        MainView = (
          <TrainSearch onSearch={handleTrainSearch} />
        );
        break;
    }
  }

  return (
    <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar
        user={currentUser}
        onLogout={handleLogout}
        onNavigate={view => setCurrentView(view)}
        currentView={currentView}
      />
      <main
        style={{
          padding: "30px 8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "62vh",
          flex: 1,
          background: "#fafbfc"
        }}
      >
        {MainView}
      </main>
      <Footer />
    </div>
  );
}

export default App;
