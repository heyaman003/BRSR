import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/50 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl flex items-center gap-4 font-bold text-gray-800">
          <img src="./logo.svg" alt="Logo" />
          <span className="md:text-3xl text-3xl text-[#14532D]">BRSR Reporter</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#"
            className="text-gray-500 text-xl font-semibold hover:text-gray-600 duration-300 transition"
          >
            Features
          </a>
          <a
            href="#"
            className="text-gray-500 text-xl font-semibold hover:text-gray-600 duration-300 transition"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/90 shadow-md py-4 backdrop-blur-lg">
          <a href="#" className="block px-6 py-2 text-gray-600 hover:bg-gray-100 transition">Home</a>
          <a href="#" className="block px-6 py-2 text-gray-600 hover:bg-gray-100 transition">About</a>
          <a href="#" className="block px-6 py-2 text-gray-600 hover:bg-gray-100 transition">Services</a>
          <a href="#" className="block px-6 py-2 text-gray-600 hover:bg-gray-100 transition">Contact</a>
        </div>
      )}
    </nav>
  );
}
