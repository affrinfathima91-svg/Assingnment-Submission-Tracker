import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  // LOGIN
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  // DARK MODE
  const [dark, setDark] = useState(false);

  // ASSIGNMENTS
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("data");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "DBMS Assignment", status: "Pending", deadline: "25 June" },
          { id: 2, title: "Python Record", status: "Submitted", deadline: "28 June" },
          { id: 3, title: "Web Tech", status: "Pending", deadline: "30 June" },
        ];
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(assignments));
  }, [assignments]);

  const login = () => {
    if (user.trim() !== "") {
      setLoggedIn(true);
    }
  };

  const changeStatus = (id) => {
    setAssignments(
      assignments.map((a) =>
        a.id === id
          ? {
              ...a,
              status:
                a.status === "Pending"
                  ? "Submitted"
                  : a.status === "Submitted"
                  ? "Late"
                  : "Pending",
            }
          : a
      )
    );
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  // LOGIN PAGE
  if (!loggedIn) {
    return (
      <div className={dark ? "dark" : ""} style={{ textAlign: "center", padding: "100px" }}>
        <h1>Assignment Tracker Login</h1>

        <input
          placeholder="Enter Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <br /><br />

        <button onClick={login}>Login</button>

        <br /><br />

        <button onClick={() => setDark(!dark)}>
          Toggle Dark Mode
        </button>
      </div>
    );
  }

  return (
    <div className={dark ? "dark" : ""}>

      {/* NAVBAR */}
      <nav className="navbar">
        <h2>Assignment Tracker</h2>

        <ul>
          <li onClick={() => scrollTo("home")}>Home</li>
          <li onClick={() => scrollTo("dashboard")}>Dashboard</li>
          <li onClick={() => scrollTo("assignments")}>Assignments</li>
          <li onClick={() => scrollTo("stats")}>Stats</li>
          <li onClick={() => scrollTo("profile")}>Profile</li>
          <li onClick={() => scrollTo("about")}>About</li>
        </ul>

        <button onClick={() => setDark(!dark)}>
          {dark ? "Light" : "Dark"}
        </button>
      </nav>

      {/* HOME */}
      <section id="home" className="hero">
        <h1>Welcome {user}</h1>
        <p>Smart Assignment Tracking System</p>
      </section>

      {/* DASHBOARD */}
      <section id="dashboard" className="section">
        <h2>Dashboard</h2>

        <div className="grid">
          <div className="card"><h3>{assignments.length}</h3><p>Total</p></div>
          <div className="card"><h3>{assignments.filter(a=>a.status==="Submitted").length}</h3><p>Submitted</p></div>
          <div className="card"><h3>{assignments.filter(a=>a.status==="Pending").length}</h3><p>Pending</p></div>
          <div className="card"><h3>90%</h3><p>Performance</p></div>
        </div>
      </section>

      {/* ASSIGNMENTS */}
      <section id="assignments" className="section">
        <h2>Assignments</h2>

        <div className="grid">
          {assignments.map((a) => (
            <div className="card" key={a.id}>
              <h3>{a.title}</h3>
              <p>{a.deadline}</p>
              <p>Status: {a.status}</p>

              <button onClick={() => changeStatus(a.id)}>Change</button>
              <button onClick={() => deleteAssignment(a.id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="section">
        <h2>Stats</h2>

        <div className="grid">
          <div className="card"><h3>A+</h3><p>Grade</p></div>
          <div className="card"><h3>95%</h3><p>Attendance</p></div>
          <div className="card"><h3>Excellent</h3><p>Feedback</p></div>
        </div>
      </section>

      {/* PROFILE */}
      <section id="profile" className="section">
        <h2>Profile</h2>

        <div className="card">
          <h3>{user}</h3>
          <p>B.Sc Computer Science</p>
          <p>Final Year</p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <h2>About</h2>
        <p>This system tracks assignments with login, dark mode, and storage support.</p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3>Assignment Tracker</h3>
      </footer>

    </div>
  );
}

export default App;