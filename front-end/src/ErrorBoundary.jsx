import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div>
      <h1>Ce pula mea are</h1>
      <p>{error.statusText || error.message || "Unknown error"}</p>
    </div>
  );
}

export default ErrorBoundary;
