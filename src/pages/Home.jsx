import React from "react";
import Particles from "../components/Particles";

const Home = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
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
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full pt-20">
        
        <div className="container mx-auto flex flex-col items-center py-3">

          <h1 className="w-full lg:max-w-10/12 text-center text-[2.30rem] font-semibold tracking-wider leading-14">Where <span className="text-[#10041e] font-bold bg-purple-600 px-2  rounded-bl-lg rounded-tr-lg">USSD</span> Meets Innovation</h1>
          <p className="text-center text-[#b5b5b5a4] text-lg">Revolutionizing Business Connectivity with Instant, Reliable, and Hassle-Free USSD Solutions.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
Home;
