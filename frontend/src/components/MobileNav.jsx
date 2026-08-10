import { LogOut, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const MobileNav = ({ closeNav, showNav }) => {
  const { logout, user } = useUserStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const navOpen = showNav ? "translate-x-0" : "translate-x-[100%]";
  return (
    <>
      {/**Overlay */}
      <div
        className={`fixed ${navOpen} inset-0 transform transition-all right-0 duration-500 z-[100002] bg-rose-600 opacity-70 w-full h-screen`}
        onClick={closeNav}
      ></div>
      <div
        className={`${navOpen} fixed flex justify-center flex-col h-full transform transition-all duration-500 delay-300 w-[80%] bg-rose-600 z-[1000050] right-0`}
      >
        <ul
          onClick={closeNav}
          className="flex flex-col items-center gap-4 text-white"
        >
          <li>
            <Link
              to={"/"}
              className=" hover:font-bold md:font-bold hover:border-b-[1.5px] sm:text-[30px]"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/about"}
              className=" hover:font-bold hover:border-b-[1.5px] sm:text-[30px] "
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={"/thoughts"}
              className=" hover:font-bold hover:border-b-[1.5px] sm:text-[30px]"
            >
              Thoughts
            </Link>
          </li>
          <li>
            <Link
              to={"/create"}
              className="hover:font-bold  sm:text-[30px] hover:border-b-2 hover:font- hover:border-white"
            >
              Create
            </Link>
          </li>
        </ul>

        <X
          className="h-6 w-6 absolute top-[0.7rem] right-[1.4rem] cursor-pointer text-white sm:font-bold"
          onClick={closeNav}
        />
        <div className="mt-2 flex items center text-white space-x-2">
          {user ? (
            <>
              <button
                className="flex mx-auto mt-40 bg-rose-500 hover:bg-amber-50 hover:text-rose-500 py-2 px-4 rounded-full items-center transition duration-300 ease-in-out cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span className="ml-2">Log Out</span>
              </button>
            </>
          ) : (
            <div className="mx-auto mt-40 " onClick={closeNav}>
              <Link
                to={"/login"}
                className="bg-rose-500  border border-rose-600 rounded-full px-8 py-2.5 md:font-medium hover:bg-amber-50 hover:text-rose-500 transition-all duration-300 ease-in-out"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="bg-rose-500 ml-5 border border-rose-600 rounded-full px-8 py-2.5 md:font-medium hover:bg-amber-50 hover:text-rose-500 transition-all duration-300 ease-in-out"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
