import React from "react";

interface HeroProps {
  title?: string;
  name?: string;
  description?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  title = "Tijo's Portfolio",
  name = "Tijo Thomas",
  description = "a Fullstack Engineer with a passion for building delightful user experiences.",
  primaryBtnText = "View Projects",
  secondaryBtnText = "Contact Me",
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <section className="bg-yellow-50 py-12" id="home">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-comic text-4xl font-extrabold mb-6 text-gray-900">
          {title}
        </h1>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Left Content */}
          <div className="w-full md:w-1/2 space-y-6">
            {/* Speech Bubble */}
            <div className="relative bg-white border-4 border-black rounded-xl p-6 shadow-comic -rotate-1 transform">
              <p className="font-comic text-lg">
                Hi there! I'm{" "}
                <span className="bg-yellow-300 px-1 rounded border border-black">
                  {name}
                </span>
                , {description}
              </p>

              {/* Speech bubble tail */}
              <div className="hidden md:block absolute -right-5 top-1/2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[20px] border-l-black border-b-[15px] border-b-transparent"></div>
              </div>
              <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent"></div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={onPrimaryClick}
                className="font-comic font-bold py-3 px-6 bg-red-400 border-3 border-black rounded-lg shadow-comic rotate-1 transform hover:scale-105 transition-transform"
              >
                {primaryBtnText}
              </button>
              <button
                onClick={onSecondaryClick}
                className="font-comic font-bold py-3 px-6 bg-teal-400 border-3 border-black rounded-lg shadow-comic -rotate-1 transform hover:scale-105 transition-transform"
              >
                {secondaryBtnText}
              </button>
            </div>
          </div>

          {/* Right Comic Panel */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-white border-4 border-black rounded-xl shadow-comic rotate-1 transform flex items-center justify-center">
              <p className="font-comic font-bold text-xl text-center p-4">
                3D Cube Coming Soon!
              </p>
            </div>
          </div>
        </div>

        {/* Lower Callout Panel */}
        <div className="mt-16 flex justify-center">
          <div className="relative max-w-2xl bg-white border-3 border-black rounded-xl p-6 shadow-comic">
            <p className="font-comic text-center">
              This portfolio will host multiple micro frontends showcasing my
              work.
            </p>

            {/* Speech bubble tail pointing up */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-[15px] border-l-transparent border-b-[20px] border-b-black border-r-[15px] border-r-transparent"></div>
            </div>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-b-[15px] border-b-white border-r-[10px] border-r-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
