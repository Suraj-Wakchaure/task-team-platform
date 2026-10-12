import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { LogOut, User, CheckSquare } from 'lucide-react';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-amber-600 flex items-center justify-center text-white">
          <CheckSquare className="w-5 h-5" />
        </div>
        <span className="font-bold text-lg text-slate-900 tracking-tight">
          TaskManager
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 text-sm text-slate-700 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
          <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-semibold text-xs">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
          </div>
          <span className="font-medium text-slate-800">{user?.name || 'User'}</span>
        </div>

        <button
          onClick={handleLogout}
          title="Sign out"
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 px-3 py-1.5 rounded-md hover:bg-slate-100 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
