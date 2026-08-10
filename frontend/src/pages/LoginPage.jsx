import {
  MailIcon,
  LockKeyholeIcon,
  ArrowRight,
  Loader,
  LogIn,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useUserStore();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

  await login(email, password);

    //console.log("Login success:", success);
        navigate("/thoughts");
   
};

  return (
    <div  className="mt-20 flex flex-col justify-center items-center bg-rose-700 mx-auto text-white w-[65%] rounded-lg py-10 sm:px-6 lg:px-8">
      <h1 className="flex justify-center items-center text-2xl font-bold">
        Enter login details
      </h1>
      <div data-aos="fade-left" data-aos-delay="150" className="mt-10 shadow-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Email
            </label>

            <div className="relative mt-2 shadow-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="w-5 h-5 text-rose-600" />
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                className="block w-full pl-10 bg-amber-50 rounded-lg py-2 px-3 p-10 text-rose-500 border-rose-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Password
            </label>

            <div className="relative mt-2 shadow-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockKeyholeIcon className="w-5 h-5 text-rose-600" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="block w-full pl-10 bg-amber-50 rounded-lg py-2 px-3 p-10 text-rose-500 border-rose-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 bg-rose-500 rounded-full text-md hover:text-rose-500 hover:cursor-pointer transition duration-500 hover:bg-amber-50 ease-in-out focus:outline-none "
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" aria-hidden="true" />
                Loading...
              </>
            ) : (
              <>
                <LogIn className="w-4 h5" aria-hidden="true" />
                Login
              </>
            )}
          </button>
        </form>
        <p className="text-white">
          Don't have an account?{" "}
          <Link to={"/register"} className="font-medium text-amber-50">
            SignUp here
            <ArrowRight className="inline h-5 w-5 font-medium" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
