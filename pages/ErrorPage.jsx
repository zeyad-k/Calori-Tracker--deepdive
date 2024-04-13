import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div>
      <h1>Something went wrong...</h1>
      <p>
        Click <Link to="/">Home Page</Link> to go back
      </p>
    </div>
  );
}
