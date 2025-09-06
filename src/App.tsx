import { Link } from "react-router-dom";

function App() {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#f0f0f0",
        width: "100%",
        color: "#1f2937",
      }}
    >
      <h1
        style={{ fontSize: "2.5rem", marginBottom: "10px", color: "#111827" }}
      >
        Welcome
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          maxWidth: "600px",
          marginBottom: "30px",
          lineHeight: "1.6",
          color: "#374151",
        }}
      >
        This is a demo application where you can explore the{" "}
        <strong>Driver Management Table</strong>. You’ll be able to view,
        filter, and export driver information in multiple formats (CSV, Excel,
        PDF, etc).
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        <Link to="/drivers">
          <button
            style={{
              padding: "12px 20px",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "white",
              cursor: "pointer",
            }}
          >
            Go to Driver Table
          </button>
        </Link>

        <Link
          to="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <button
            style={{
              padding: "12px 20px",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #2563eb",
              backgroundColor: "white",
              color: "#2563eb",
              cursor: "pointer",
            }}
          >
            Learn React
          </button>
        </Link>
      </div>

      <footer style={{ marginTop: "50px", fontSize: "0.9rem", color: "#555" }}>
        © {new Date().getFullYear()} Driver Management App | Built with React ⚛️
      </footer>
    </div>
  );
}

export default App;
