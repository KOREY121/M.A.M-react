import { useState, useEffect } from 'react';
import { menuAPI } from '../services/apiService';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await menuAPI.getMenuItems();
      setMenuItems(data);
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800">Our Menu</h1>
        <p className="text-gray-600 mt-2">
          Explore our freshly prepared dishes crafted to delight your taste buds.
        </p>
      </div>

      {/* Error or Empty State */}
      {error && !loading && menuItems.length === 0 && (
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-teal-50 to-orange-50 border-l-4 border-teal-500 p-8 rounded-lg shadow-sm text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Welcome to Korey's Kitchen! 🍽️
            </h2>
            <p className="text-gray-700 text-lg">
              Our delicious menu will be uploaded soon. Stay tuned for amazing dishes!
            </p>
            <button
              onClick={fetchMenuItems}
              className="mt-6 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition"
            >
              🔄 Refresh Menu
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          <p className="mt-4 text-gray-600">Loading menu...</p>
        </div>
      )}

      {/* Menu Items */}
      {!loading && !error && menuItems.length > 0 && (
        <>
          <div className="text-center mb-6">
            <button
              onClick={fetchMenuItems}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition mr-4"
            >
              🔄 Refresh Menu
            </button>
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition">
              ↓ Show Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 pb-12">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={item.image || '/placeholder-food.jpg'}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-orange-600 font-bold text-lg">
                      ₦{item.price.toLocaleString()}
                    </span>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Empty State (no error, just no items) */}
      {!loading && !error && menuItems.length === 0 && (
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-teal-50 to-orange-50 border-l-4 border-teal-500 p-8 rounded-lg shadow-sm text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Welcome to Korey's Kitchen! 🍽️
            </h2>
            <p className="text-gray-700 text-lg">
              Our delicious menu will be uploaded soon. Stay tuned for amazing dishes!
            </p>
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      <button className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg transition flex items-center gap-2">
        🛒 Cart
      </button>
    </div>
  );
}

export default Menu;