import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./../pages/Login";
import Home from "./../pages/Home";

import { useSelector } from 'react-redux';

function ProtectedRoute ({ children }) {
  const authState = useSelector((state) => state);
  const location = useLocation();
  if (!authState.auth.isAuthenticated ||  authState.auth.token === "") {
      return <Navigate to="/" replace state={{ path: location.pathname }} />;
  }
  return children;
};

const RouteApp = () =>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteApp;