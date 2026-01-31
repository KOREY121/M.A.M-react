import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/media/item_images/Screenshot 2025-09-03 004519.png',
      title: 'WELCOME',
      subtitle: 'Freshly made, just for you',
      showButton: true
    },
    {
      image: '/media/item_images/Screenshot 2025-09-01 133750.png',
      title: 'Satisfy your cravings...',
      subtitle: '',
      showButton: false
    },
    {
      image: '/media/item_images/amala.png',
      title: 'Fill your belly...',
      subtitle: '',
      showButton: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-full mb-5 shadow-sm">
      <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden rounded-b-2xl">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${
              index === currentSlide ? 'block' : 'hidden'
            } duration-700 ease-in-out`}
          >
            <img
              src={slide.image}
              className="absolute block w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className="mt-4 text-base sm:text-lg text-white">
                  {slide.subtitle}
                </p>
              )}
              {slide.showButton && (
                <Link
                  to="/menu"
                  className="mt-6 px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg text-white font-medium"
                >
                  Browse Menu
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        type="button"
        onClick={goToPrevious}
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
        aria-label="Previous slide"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          ‹
        </span>
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={goToNext}
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
        aria-label="Next slide"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          ›
        </span>
      </button>
    </div>
  );
}

export default Carousel;
