import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  BookOpenIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { getAllBooks, searchBooks } from "../data/booksData"; // ✅ ดึงข้อมูลจาก booksData.js

const AllBook = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // โหลดข้อมูลหนังสือทั้งหมดตอนเริ่มต้น
  useEffect(() => {
    const allBooks = getAllBooks();
    setBooks(allBooks);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/login");
  };

  const handleDelete = (id) => {
    if (window.confirm("ต้องการลบหนังสือเล่มนี้ใช่หรือไม่?")) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleEdit = (book) => {
    navigate(`/books/${book.id}`, { state: { book } });
  };

  const goDetail = (book) => {
    navigate(`/books/${book.id}`, { state: { book } });
  };

  const handleAddBook = () => {
    navigate("/store-manager/add-book");
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setBooks(getAllBooks());
    } else {
      setBooks(searchBooks(query));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-600 to-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <BookOpenIcon className="h-8 w-8" />
              <h1 className="text-2xl font-bold">BookStore - BackOffice</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30
                rounded-lg transition-colors"
            >
              <LogoutIcon className="h-5 w-5" />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpenIcon className="h-8 w-8 text-sky-600" />
              หนังสือทั้งหมด ({books.length})
            </h2>
            <button
              onClick={handleAddBook}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold
                        px-5 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md"
            >
              <PlusIcon className="h-5 w-5" />
              เพิ่มหนังสือใหม่
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 ค้นหาหนังสือ ชื่อ / ผู้แต่ง / หมวดหมู่..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          {/* Table Section */}
          {loading ? (
            <p className="text-center text-gray-500 text-lg py-10">
              กำลังโหลดข้อมูล...
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full bg-white">
                <thead className="bg-sky-100">
                  <tr>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">#</th>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                      ชื่อหนังสือ
                    </th>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                      ผู้แต่ง
                    </th>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                      หมวดหมู่
                    </th>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                      ราคา (บาท)
                    </th>
                    <th className="py-3 px-6 text-center text-gray-700 font-semibold">
                      การจัดการ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {books.length > 0 ? (
                    books.map((book, index) => (
                      <tr
                        key={book.id}
                        className="border-t hover:bg-green-50 transition-colors"
                      >
                        <td className="py-3 px-6">{index + 1}</td>
                        <td
                          className="py-3 px-6 text-sky-700 font-medium underline cursor-pointer hover:text-sky-900"
                          onClick={() => goDetail(book)}
                        >
                          {book.title}
                        </td>
                        <td className="py-3 px-6 text-gray-600">{book.author}</td>
                        <td className="py-3 px-6 capitalize text-gray-600">
                          {book.category}
                        </td>
                        <td className="py-3 px-6 text-gray-600">{book.price}</td>
                        <td className="py-3 px-6">
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => handleEdit(book)}
                              className="bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-2 rounded-lg flex items-center gap-1 shadow-sm"
                            >
                              <PencilIcon className="h-5 w-5" />
                              แก้ไข
                            </button>
                            <button
                              onClick={() => handleDelete(book.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 shadow-sm"
                            >
                              <TrashIcon className="h-5 w-5" />
                              ลบ
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-8 text-gray-500 italic bg-gray-50"
                      >
                        ไม่มีข้อมูลหนังสือ
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBook;
