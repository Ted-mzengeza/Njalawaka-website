import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (

    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center gap-3">

          <img
            src="/images/logo.png"
            alt="logo"
            className="h-10 sm:h-11"
          />

          <h1 className="text-lg sm:text-xl font-bold text-green-700 leading-tight">
            Njalawaka Agri and General Dealers
          </h1>

        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 font-medium">

          <Link to="/" className="hover:text-green-700">
            Home
          </Link>

          <Link to="/products" className="hover:text-green-700">
            Products
          </Link>

          <Link to="/equipment" className="hover:text-green-700">
            Equipment
          </Link>

          <Link to="/animals" className="hover:text-green-700">
            Animals
          </Link>

          <Link to="/contact" className="hover:text-green-700">
            Contact
          </Link>

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (

        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4 font-medium shadow-lg">

          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link to="/products" onClick={() => setOpen(false)}>
            Products
          </Link>

          <Link to="/equipment" onClick={() => setOpen(false)}>
            Equipment
          </Link>

          <Link to="/animals" onClick={() => setOpen(false)}>
            Animals
          </Link>

          <Link to="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>

        </div>

      )}

    </nav>
  );
}