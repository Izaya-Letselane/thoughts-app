import { Link, useNavigate } from "react-router-dom";
import { BrainIcon, LogOut, SquareMenuIcon } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const Navbar = ({openNav}) => {
  const {user, logout} = useUserStore()
  const navigate = useNavigate()
  const handleLogout = async () => {
  await logout();
  navigate("/");
};
  return (
    <nav data-aos="fade-right" className="flex bg-rose-700 items-center justify-between p-2 text-white w-full fixed z-[1000]">
      <div className="">
        <Link className="flex items-center font-serif font-bold" to="/">
          <BrainIcon className="h-8 w-8" />
          <span className=" hidden md:block">Thoughts</span>
        </Link>
      </div>
      <div className="flex gap-4 items-center hidden md:block" >
        <ul className="flex items-center gap-4">
          <li>
            <Link to={"/"} className="hover:text-rose-400 md:font-bold ">Home</Link>
          </li>
          <li>
            <Link to={"/about"} className="hover:text-rose-400 md:font-bold ">About</Link>
          </li>
          <li>
            <Link to={"/thoughts"} className="hover:text-rose-400 md:font-bold ">Thoughts</Link>
          </li>
          <li>
            <Link to={"/create"} className="hover:text-rose-400 md:font-bold ">Create</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-2">
        {user?(
          <>
          <button
								className='hidden md:flex bg-rose-500 hover:bg-amber-50 hover:text-rose-500 md:py-2 md:px-4 
						rounded-full items-center transition duration-300 ease-in-out cursor-pointer'
								onClick={handleLogout}
							>
								<LogOut size={18} />
								<span className='ml-2'>Log Out</span>
							</button>
          </>
        ):(
          <>
          <Link to={"/login"} className="bg-rose-500 border hidden md:block border-rose-600 rounded-full px-8 py-2.5 md:font-medium hover:bg-amber-50 hover:text-rose-500 transition-all duration-300 ease-in-out">Login</Link>
          <Link to={"/register"} className="bg-rose-500 border hidden md:block border-rose-600 rounded-full px-8 py-2.5 md:font-medium hover:bg-amber-50 hover:text-rose-500 transition-all duration-300 ease-in-out">Register</Link>
        
          </>
        )}
        <SquareMenuIcon className="w-8 h-8 md:hidden cursor-pointer hover:text-rose-200 transtion-all duration-500 ease-in-out" onClick={openNav}/>
        
      </div>
    </nav>
  );
};

export default Navbar;
