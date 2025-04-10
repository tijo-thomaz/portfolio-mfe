import React from "react";
import { HeroSection } from "./components";

const App: React.FC = () => {
  return (
    <div className="font-comic">
      <HeroSection
        title="Tijo Thomas ⚡"
        subtitle="Coding Superhero"
        description="Transforming ideas into digital reality with the power of code. Frontend specialist with a passion for creating immersive user experiences."
      />

      {/* Add other sections here */}
      <div id="arsenal" className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold">Power Arsenal Section</h2>
      </div>

      <div id="contact" className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold">Contact Section</h2>
      </div>
    </div>
  );
};

export default App;
