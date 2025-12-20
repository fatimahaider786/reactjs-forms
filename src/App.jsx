import Form from "./components/Form";
import "./App.css";

function App() {
  return (
    <div>
      {/* HEADER */}
      <div className="header-section">
  <h1>GitHub Repository Search</h1>
</div>

      {/* FORM + RESULTS */}
      <Form />
    </div>
  );
}

export default App;