import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreatePage from "./pages/CreatePage";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import Thoughts from "./pages/Thoughts";
import ResponsiveNav from "./components/ResponsiveNav";

import AOS from "aos";
import "aos/dist/aos.css";
import UpdatePage from "./pages/UpdatePage";
import About from "./pages/About";

function App() {
  useEffect(() => {
    const initAOS = async () => {
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
        anchorPlacement: "top-bottom",
      });
    };
    initAOS();
  }, []);
  const { user, checkAuth, checkingAuth } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen overflow-hidden bg-amber-50 ">
      <ResponsiveNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About/>} />
        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route path="/create" element={user ? <CreatePage /> : <LoginPage />} />
        <Route path="/thoughts" element={user ? <Thoughts /> : <LoginPage />} />
        <Route
          path="/notes/update/:id"
          element={user ? <UpdatePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
