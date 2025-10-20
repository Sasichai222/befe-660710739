import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

// Pages
import HomePage from "./pages/HomePage";
import BookListPage from "./pages/BookListPage";
import BookDetailPage from "./pages/BookDetailPage";
import CategoryPage from "./pages/CategoryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import AddBookPage from "./pages/AddBookPage";
import AllBook from "./pages/AllBook";

// ✅ Layout wrapper เพื่อแสดง/ซ่อน Navbar และ Footer ตาม path
function LayoutWrapper() {
  const location = useLocation();

  // path ที่ไม่ต้องการให้มี Navbar/Footer (BackOffice)
  const hideNavAndFooter = [
    "/login",
    "/allbook",
    "/store-manager/add-book",
  ];

  const shouldHide = hideNavAndFooter.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ ซ่อน Navbar/Footer ในหน้า BackOffice */}
      {!shouldHide && <Navbar />}

      <main className="flex-grow bg-gray-50">
        <Routes>
          {/* BackOffice / Admin */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/allbook" element={<AllBook />} />
          <Route path="/store-manager/add-book" element={<AddBookPage />} />

          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BookListPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!shouldHide && <Footer />}
    </div>
  );
}

// ✅ Router หลัก
function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
