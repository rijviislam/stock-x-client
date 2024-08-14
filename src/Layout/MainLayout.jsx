import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

export default function MainLayout() {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");
  return (
    <div>
      {noHeaderFooter || <Navbar />}
      <div className="min-h-screen">
        <Outlet />
      </div>
      {noHeaderFooter || <Footer />}
    </div>
  );
}
