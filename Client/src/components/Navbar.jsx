import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axiosCalls/axios';

export default function Navbar({ cartCount = 0 }) {
  const navigate = useNavigate();

  async function handleLogOut() {
    try {
      await axiosInstance.post('/customers/logout');
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/login');
    }
  }

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-[#2b2118] py-2 text-center text-[10px] uppercase tracking-[0.3em] text-[#e2d9c6]">
        Complimentary shipping on orders over $500
      </div>

      {/* Header */}
      <header className="border-b border-[#d9cfbe] bg-[#fbf8f1]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-[#6e6250] md:flex">
            <Link to="/products" className="transition hover:text-[#7a4a2b]">Products</Link>
          </nav>

          <Link to="/wishlist" className="transition hover:text-[#7a4a2b]">Wishlist</Link>

          <Link to="/" className="text-lg tracking-[0.25em] text-[#2b2118]">
            ASHFORD <span className="text-[#b08d57]">&amp;</span> SONS
          </Link>

          <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-[#6e6250] md:flex">
            <Link to="/login" className="transition hover:text-[#7a4a2b]">Account</Link>
            <Link to="/products" className="transition hover:text-[#7a4a2b]">
              Cart ({cartCount})
            </Link>
            <button
              type="button"
              onClick={handleLogOut}
              className="transition hover:text-[#7a4a2b]"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
    </div>
  );
}