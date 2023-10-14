import "./index.css";

export default function Student({ name }) {
  return (
    <div className="student-container">
      <div className="student-name">{name}</div>
    </div>
  );
}
