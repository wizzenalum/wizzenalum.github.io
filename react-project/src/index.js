import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
const App = React.lazy(() => import("./App"));

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<h1>Loading.....</h1>}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
