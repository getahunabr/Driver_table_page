import { useNavigate } from "react-router-dom";

const BackButton = ({ label }: { label: string }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        padding: "8px,12px",
        backgroundColor: "#2c3e50",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      ← {label}
    </button>
  );
};

export default BackButton;
