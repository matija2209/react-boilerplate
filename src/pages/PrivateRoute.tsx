import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
// import Sidebar from "./components/Sidebar";

export const PrivateRoutes = () => {
  const navigate = useNavigate();
  //   const user = auth.currentUser;
  const [loading, setloading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    IsLoggedIn().then((result) => {
      if (result) {
        setIsLogged(true);
      } else {
        navigate("/login");
      }
      setloading(false);
    });
  }, [navigate]);

  if (loading) return <h2>Loading</h2>;
  return isLogged && !loading ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to={"/login"}></Navigate>
  );
};

async function IsLoggedIn(): Promise<boolean> {
  try {
    await new Promise((resolve, reject) =>
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            // User is signed in.
            resolve(user);
          } else {
            // No user is signed in.
            reject("no user logged in");
          }
        },
        // Prevent console error
        (error) => reject(error)
      )
    );
    return true;
  } catch (error) {
    return false;
  }
}
