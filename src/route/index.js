import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./../pages/Login";
import Home from "./../pages/Home";

import { useSelector } from 'react-redux';


const ProtectedRoute = ({ authState, children }) => {
    if (!authState.isAuthenticated ||  authState.token !== "") {
        return <Navigate to="/" replace />;
    }

    return children;
};

const RouteApp = () =>{
const authState = useSelector((state) => state);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
        <Route
          path="/home"
          element={
            <ProtectedRoute authState={authState}>
              <Home />
            </ProtectedRoute>
          }
        />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteApp;