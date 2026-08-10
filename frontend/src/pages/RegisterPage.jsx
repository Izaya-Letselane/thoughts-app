import {
  ArrowRight,
  Loader,
  LockKeyholeIcon,
  MailIcon,
  User2,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useState } from "react";
const RegisterPage = () => {
  const { signup, loading } = useUserStore();
  //const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };
  return (
    <div className="mt-20 flex flex-col justify-center items-center bg-rose-700 mx-auto text-white w-[65%] rounded-lg py-10 sm:px-6 lg:px-8">
      <h1 className="flex justify-center items-center text-2xl font-bold">
        Create an account
      </h1>
      <div data-aos="fade-right" className="mt-10 shadow-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>

            <div className="relative mt-2 shadow-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User2 className="w-5 h-5 text-rose-600" />
              </div>
              <input
                type="text"
                id="name"
                placeholder="Jame Doe"
                className="block w-full pl-10 bg-amber-50 rounded-lg py-2 px-3 p-10 text-rose-500 border-rose-300"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>

            <div className="relative mt-2 shadow-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="w-5 h-5 text-rose-600" />
              </div>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="block w-full px-3 py-2 pl-10 bg-amber-50 rounded-lg p-10 text-rose-500 border-rose-300"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>

            <div className="relative mt-2 shadow-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockKeyholeIcon className="w-5 h-5 text-rose-600" />
              </div>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="block w-full pl-10 bg-amber-50 rounded-lg py-2 px-3 p-10 text-rose-500 border-rose-300"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirm Password
            </label>

            <div className="relative mt-2 shadow-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockKeyholeIcon className="w-5 h-5 text-rose-600" />
              </div>
              <input
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                className="block w-full px-3 py-2 pl-10 bg-amber-50 rounded-lg p-10 text-rose-500 border-rose-300"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 bg-rose-500 rounded-full text-md hover:text-rose-500 hover:cursor-pointer transition duration-500 hover:bg-amber-50 ease-in-out focus:outline-none "
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" />
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                Sign Up
              </>
            )}
          </button>
        </form>
        <p className="text-white">
          Already have an account?{" "}
          <Link to={"/login"} className="font-medium text-amber-50">
            Login here
            <ArrowRight className="inline h-5 w-5 font-medium" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
