import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <>
      <h1>Welcome to the Landing Page</h1>
      <p>
        to get started, <Link to="/track">Start tracking</Link>
      </p>
    </>
  );
}
