function About() {
  return (
    <div className="pt-24 min-h-screen">
      <section className="pt-28 p-6 md:p-20 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">About Us</h2>
        <p className="text-base md:text-lg leading-relaxed text-center mb-12">
          At <span className="font-semibold">Koreys kitchen</span>, food is more than just a necessity —
          its an experience. From our humble beginnings, weve dedicated ourselves to creating
          meals that bring joy, comfort, and unforgettable memories.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/media/item_images/chef.png"
            alt="Our Chefs"
            className="rounded-2xl shadow-lg"
          />
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Our Belief</h3>
            <p className="text-base md:text-lg leading-relaxed mb-6">
              We believe every dish should tell a story. Our chefs blend tradition and creativity,
              using only the freshest ingredients to prepare meals that satisfy both body and soul.
            </p>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Why Choose Us?</h3>
            <ul className="list-disc pl-6 space-y-2 text-base md:text-lg">
              <li>Passionate chefs with years of experience</li>
              <li>Fresh, locally sourced ingredients</li>
              <li>A wide variety of delicious menu options</li>
              <li>Commitment to quality and customer satisfaction</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
