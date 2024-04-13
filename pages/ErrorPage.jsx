import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HOME_LINK = "/";
const REDIRECT_COUNT = 10;
const COUNT_DOWN_INTERVAL = 1000;

export function ErrorPage() {
  const [redirectCounter, setRedirectCounter] = useState(REDIRECT_COUNT);

  const intervalHandler = useRef();
  const navigateToHome = useNavigate();

  useEffect(() => {
    if (redirectCounter === 0) {
      clearInterval(intervalHandler.current);
      navigateToHome(HOME_LINK);
    }
  }, [redirectCounter]);

  useEffect(() => {
    intervalHandler.current = setInterval(() => {
      setRedirectCounter((prev) => prev - 1);
    }, COUNT_DOWN_INTERVAL);
    return () => {
      clearInterval(intervalHandler.current);
    };
  }, []);

  return (
    <div>
      <h1>Something went wrong...</h1>
      <p>Redirecting to Home Page in {redirectCounter} secondes</p>
      <p>
        Click <Link to={HOME_LINK}>Home Page</Link> to go back
      </p>
    </div>
  );
}
