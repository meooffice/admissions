import React from 'react';
import {
  Home,
  Search,
  UserPlus,
  FileText,
  ListOrdered,
  ArrowUpWideNarrow,
  UserPen,
  Users,
  FileUser
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import srkImg from '../assets/images/srk.png';

const NavBar = () => {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
      <div className="flex-1">
        <button className="btn btn-ghost text-xl" onClick={() => handleNav('/')}>
          School Dashboard
        </button>
      </div>

      <div className="flex-none gap-2">
        {/* Home Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <Home size={18} />
            Home
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 z-[1] mt-3 w-40 p-2 shadow rounded-box">
            <li>
              <button onClick={() => handleNav('/')}>Dashboard</button>
            </li>
            <li>
              <button onClick={() => handleNav('/classes')}>Classes</button>
            </li>
            <li>
              <button onClick={() => handleNav('/memo')}>Marks Memo</button>
            </li>
            <li>
              <button onClick={() => handleNav('/tenth')}>Tenth Calss</button>
            </li>
          </ul>
        </div>

        {/* Direct Links */}
        <button className="btn btn-ghost" onClick={() => handleNav('/post')}>
          <UserPlus size={18} />
          Admission
        </button>

        <button className="btn btn-ghost" onClick={() => handleNav('/search')}>
          <Search size={18} />
          Search
        </button>

        <button className="btn btn-ghost" onClick={() => handleNav('/staff')}>
          <Users size={18} />
          Staff
        </button>

        <button className="btn btn-ghost" onClick={() => handleNav('/docs')}>
          <FileText size={18} />
          Certificates
        </button>

        {/* Orders Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <ListOrdered size={18} />
            Orders
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 z-[1] mt-3 w-40 p-2 shadow rounded-box">
            <li>
              <button onClick={() => handleNav('/increment')} className="flex items-center gap-2">
                <ArrowUpWideNarrow size={16} />
                Increment
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('/surrender')} className="flex items-center gap-2">
                <FileUser size={16} />
                Surrender Leave
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('/leave')} className="flex items-center gap-2">
                <UserPen size={16} />
                Leave
              </button>
            </li>
          </ul>
        </div>

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src={srkImg}
              />
            </div>
          </div>

          <ul className="menu menu-sm dropdown-content bg-base-100 z-[1] mt-3 w-52 p-2 shadow rounded-box">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
