import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import images from "../../assets/images"
import Particles from "../../components/Particles";
import ShiyText from "../../components/ShinyText"

const LandingPage = () => {
  const location = useLocation();

  return (
    <section>
      <div className="relative w-full h-full overflow-hidden pb-8 ">
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full pt-36">
          <div className="container mx-auto flex flex-col items-center py-2">
            <div className="px-4 text-center flex flex-col items-center justify-center ">
              <h1 className="w-full lg:max-w-10/12 text-center text-[2.30rem] font-semibold tracking-wider leading-14">
                Where{" "}
                <span className="text-[#6315db] font-bold px-2 rounded-bl-lg rounded-tr-lg">
                  USSD
                </span>{" "}
                Meets Innovation
              </h1>
              <p className="text-center text-[#b5b5b5a4] text-lg">
                Revolutionizing Business Connectivity with Instant, Reliable,
                and Hassle-Free USSD Solutions.
              </p>
            </div>

            <div className="flex mt-5 w-full justify-center items-center flex-col md:flex-row gap-5 md:gap-8 font-semibold text-md">
              <Link className="py-2 px-29 sm:px-36 bg-white text-[#07020D] rounded-lg hover:bg-[#6315db] hover:text-white transition duration-300 ease-in-out -skew-x-14">
                Book a demo
              </Link>
              <Link
                to={"/auth"}
                state={{ backgroundLocation: location }}
                className="py-2 px-10 border border-[#6315db] rounded-lg hover:bg-[#6315db] transition duration-300 ease-in-out -skew-x-14 cursor-pointer"
              >
                <ShiyText
                  text="Try it Now"
                  disabled={false}
                  speed={3}
                  className="custom-class"
                />
              </Link>
            </div>

            <img
              src={images.backwythFlowcChart}
              alt="flow-chart"
              className="py-6 px-4 lg:w-[62%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
