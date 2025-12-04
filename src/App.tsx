import { useState } from "react";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Products } from "./components/Products";
import { Production } from "./components/Production";
import { Contact } from "./components/Contact";
import { AdminPanel } from "./components/AdminPanel";
import { Navigation } from "./components/Navigation";
import { WhatsAppButton } from "./components/WhatsAppButton";

export type Page =
  | "home"
  | "about"
  | "products"
  | "production"
  | "contact"
  | "admin";

export default function App() {
  const initialPage: Page =
    window.location.pathname === "/admin" ? "admin" : "home";

  const [currentPage, setCurrentPage] = useState<Page>(initialPage);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={setCurrentPage} />;
      case "about":
        return <About />;
      case "products":
        return <Products />;
      case "production":
        return <Production />;
      case "contact":
        return <Contact />;
      case "admin":
        return <AdminPanel />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
      <WhatsAppButton />
    </div>
  );
}
