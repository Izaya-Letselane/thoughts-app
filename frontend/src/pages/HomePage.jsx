import image from "../assets/brain.jpg";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import About from "./About";
const HomePage = () => {
  const { user } = useUserStore();
  return (
    <div className="mt-20 p-20 w-full h-full flex justify-center flex-col bg-amber-50">
      <div
        data-aos="fade-right"
        className="w-[90%] mx-auto items-center grid grid-cols-1 xl:grid-cols-2 gap-6"
      >
        <div>
          <h1 className="font-bold text-3xl sm:text-6xl text-rose-700">
            Join Us and Share Your Daily Thoughts
          </h1>
          <p className="mt-4 text-3xl font-medium font-sans sm:text-lg text-rose-700">
            Write, Document Your Day And Keep Records of Your Life
          </p>
          {user ? (
            <>
              <button className="mt-10 bg-rose-500 border text-white rounded-full px-8 py-2.5 md:font-medium hover:bg-amber-100 cursor-pointer hover:text-rose-600 transition-all duration-300">
                <Link to={"/create"}>Share Your Thoughts</Link>
              </button>
            </>
          ) : (
            <>
              <button className="mt-10 bg-rose-500 border text-white rounded-full px-8 py-2.5 md:font-medium hover:bg-amber-100 cursor-pointer hover:text-rose-600 transition-all duration-300">
                <Link to={"/register"}>Join Us</Link>
              </button>
            </>
          )}
        </div>
        <div className="mx-auto hidden xl:block">
          <img
            data-aos="fade-left"
            data-aos-delay="150"
            src={image}
            height={1000}
            width={1000}
            className="border border-rose-300 rounded-2xl"
          />
        </div>
      </div>
      <About/>
      
    </div>
  );
};

export default HomePage;
