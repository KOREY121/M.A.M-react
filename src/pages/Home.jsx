import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';

function Home() {
  const featuredDishes = [
    {
      image: '/media/item_images/Screenshot 2025-09-01 134055.png',
      title: 'Spicy Jollof Rice',
      description: 'A Nigerian classic with smoky flavor, served with chicken.'
    },
    {
      image: '/media/item_images/Screenshot 2025-09-04 232551.png',
      title: 'Stirfry Spaghetti',
      description: 'Perfectly seasoned, with turkey grilled to juicy perfection.'
    },
    {
      image: '/media/item_images/Screenshot 2025-09-03 211519.png',
      title: 'Fried Plantains',
      description: 'Sweet golden plantains, crispy outside and soft inside.'
    }
  ];

  const drinks = [
    {
      image: '/media/item_images/orange juice.png',
      title: 'Fresh Orange Juice',
      description: 'Squeezed daily for a refreshing taste.',
      ringColor: 'ring-amber-200',
      colSpan: ''
    },
    {
      image: '/media/item_images/zobo.png',
      title: 'Chilled Zobo',
      description: 'Sweetened hibiscus tea with ginger & spice.',
      ringColor: 'ring-red-200',
      colSpan: 'lg:col-span-2'
    },
    {
      image: '/media/item_images/palmwine.png',
      title: 'Palm Wine',
      description: 'Traditional drink, fresh from the source.',
      ringColor: 'ring-green-200',
      colSpan: ''
    },
    {
      image: '/media/item_images/chapman.png',
      title: 'Chapman',
      description: 'The Nigerian cocktail, sweet and fizzy.',
      ringColor: 'ring-pink-200',
      colSpan: 'sm:col-span-2'
    }
  ];

  const cakes = [
    {
      image: '/media/item_images/vanilla cake.png',
      title: 'Vanilla Cake',
      description: 'Fluffy and creamy classic delight.',
      ringColor: 'ring-amber-200'
    },
    {
      image: '/media/item_images/chocolate cake.png',
      title: 'Chocolate Cake',
      description: 'Rich, moist, and chocolatey goodness.',
      ringColor: 'ring-brown-300'
    },
    {
      image: '/media/item_images/strawberry cake.png',
      title: 'Strawberry Cake',
      description: 'Fresh strawberry flavor with a sweet touch.',
      ringColor: 'ring-pink-300'
    },
    {
      image: '/media/item_images/red velvet.png',
      title: 'Red Velvet Cake',
      description: 'Soft and smooth with a cream cheese twist.',
      ringColor: 'ring-red-300'
    },
    {
      image: '/media/item_images/pineapple cake.png',
      title: 'Pineapple Cake',
      description: 'Rich, moist, and Tropical goodness.',
      ringColor: 'ring-brown-300'
    },
    {
      image: '/media/item_images/coconut cake.png',
      title: 'Coconut Cake',
      description: 'Rich, moist, and Coconutey goodness.',
      ringColor: 'ring-brown-300'
    }
  ];

  const parfaits = [
    '/media/item_images/parfait.png',
    '/media/item_images/parfait (2).png',
    '/media/item_images/parfait (3).png'
  ];

  const courierServices = [
    '/media/item_images/Screenshot 2025-09-13 210304.png',
    '/media/item_images/Screenshot 2025-09-13 210339.png',
    '/media/item_images/Screenshot 2025-09-13 210430.png'
  ];

  return (
    <div className="pt-16">
      {/* Hero Carousel */}
      <Carousel />

      {/* Chef Section */}
      <section className="relative bg-gradient-to-r from-orange-200 via-yellow-100 to-yellow-50 p-6 md:p-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-xl shadow-md m-4">
        <div>
          <img
            src="/media/item_images/chef.png"
            alt="Chef"
            className="rounded-2xl object-contain mx-auto"
          />
        </div>
        <div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center md:text-left">
            Our Exceptional Chefs
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-center md:text-left italic">
            At koreys kitchen, our chefs bring creativity, passion, and expertise
            to every plate. Their dedication ensures each meal is a true celebration
            of flavor and quality.
          </p>
          <div className="flex justify-center md:justify-start mt-6">
            <Link
              to="/menu"
              className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition"
            >
              View our Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16 bg-gradient-to-r from-amber-50 via-white to-amber-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-amber-800 mb-12">
            ----- Featured Dishes -----
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-500"
              >
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-xl font-bold">{dish.title}</h3>
                  <p className="text-gray-600 mt-2">{dish.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drinks Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 via-white to-amber-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-amber-800 mb-12">
            -------- Drinks on the Side 🥤--------
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {drinks.map((drink, index) => (
              <div
                key={index}
                className={`p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-500 ${drink.colSpan}`}
              >
                <img
                  src={drink.image}
                  alt={drink.title}
                  className={`max-w-full h-auto mx-auto rounded-full mb-4 ring-4 ${drink.ringColor}`}
                />
                <h3 className="text-xl font-semibold text-gray-800">{drink.title}</h3>
                <p className="text-gray-500 mt-2">{drink.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cakes Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 via-white to-amber-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-amber-800 mb-12">
            -------- Browse our Cake Section 🎂 --------
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cakes.map((cake, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-500"
              >
                <img
                  src={cake.image}
                  alt={cake.title}
                  className={`w-32 h-32 mx-auto rounded-full mb-4 ring-4 ${cake.ringColor}`}
                />
                <h3 className="text-xl font-semibold text-gray-800">{cake.title}</h3>
                <p className="text-gray-500 mt-2">{cake.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parfait Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 via-white to-amber-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-amber-800 mb-12">
            -------- Parfait 🎂 --------
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {parfaits.map((parfait, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-500"
              >
                <img
                  src={parfait}
                  alt={`Parfait ${index + 1}`}
                  className="w-32 h-32 mx-auto rounded-full mb-4 ring-4 ring-amber-200"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courier Services Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 via-white to-amber-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-amber-800 mb-12">
            -------- our courier services 🚴‍♀ --------
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courierServices.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-500"
              >
                <img
                  src={service}
                  alt={`Courier Service ${index + 1}`}
                  className="w-32 h-32 mx-auto rounded-full mb-4 ring-4 ring-amber-200"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  <i>We deliver fast services to your doorstep</i>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
