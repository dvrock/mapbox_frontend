import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Videos from "./Videos";
import Maps from "./Maps";

import Example from "./Example";
function App() {
  return (
    <Router id="container">
      <Routes>
        <Route path="/" element={<Videos />} />
        <Route
          path="/map"
          element={
            <Example token="pk.eyJ1IjoidXNhbWEzNDIxIiwiYSI6ImNrem1sZzc1bTJwZzkyd25ya2dvYmExYWUifQ.DOhsn6ygtaCrOK1xRAGHsg" />
          }
        />
        <Route
          path="/geocode"
          element={
            <Example token="pk.eyJ1IjoidXNhbWEzNDIxIiwiYSI6ImNrem1sZzc1bTJwZzkyd25ya2dvYmExYWUifQ.DOhsn6ygtaCrOK1xRAGHsg" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
