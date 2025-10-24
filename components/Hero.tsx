import React from 'react';

const Hero: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center text-white min-h-[350px] flex items-center"
      style={{ backgroundImage: "url('https://www.rd.usda.gov/sites/default/files/usda_rd_our_purpose_hero_0.jpg')" }}
      aria-label="A family walking through a field on a farm, representing rural life and agriculture"
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-usda-blue/80 p-8 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2 font-serif">
            Funding Rural America
            </h2>
            <p className="text-lg md:text-xl font-light">
             Providing loans, grants, and technical assistance to foster growth and opportunity.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;