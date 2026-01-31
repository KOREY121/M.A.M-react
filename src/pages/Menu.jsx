import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { menuAPI } from '../services/apiService';

function Menu() {
  const [showFilters, setShowFilters] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    setLoading(true);
    setError('');
    
    try {
      
      const data = await menuAPI.getMenuItems();
      setMenuItems(data);
    } catch (err) {
      console.error('Error loading menu:', err);
      setError('Failed to load menu items');
      
      loadFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadFromLocalStorage = () => {
    const vendorItems = JSON.parse(localStorage.getItem('foodItems')) || [];
    
    if (vendorItems.length === 0) {
      setMenuItems(getDefaultMenuItems());
    } else {
      const formattedItems = vendorItems.map((item, index) => ({
        id: index + 1,
        name: item.name,
        description: '',
        price: parseFloat(item.price),
        image: item.image
      }));
      setMenuItems(formattedItems);
    }
  };

  const getDefaultMenuItems = () => {
    return [
      {
        id: 1,
        name: 'Amala Special',
        description: 'With gbegiri & ewedu',
        price: 2500,
        image: '/media/item_images/amala.png'
      },
      {
        id: 2,
        name: 'Rice & Turkey',
        description: 'Jollof rice with grilled turkey',
        price: 5000,
        image: '/media/item_images/Screenshot 2025-09-01 134026.png'
      },
      {
        id: 3,
        name: 'Spaghetti',
        description: 'Slurpy spaghetti and shrimp',
        price: 5000,
        image: '/media/item_images/Screenshot 2025-09-04 232551.png'
      },
      
    ];
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const addToCart = (item) => {
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="pt-24 min-h-screen">
      <section className="pt-28 p-6 md:p-20 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Menu</h2>
        <p className="text-base md:text-lg leading-relaxed text-center mb-12">
          Explore our freshly prepared dishes crafted to delight your taste buds.
        </p>
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-center">
            {error} - Showing cached items
          </div>
        )}

        {/* Refresh Button */}
        <div className="text-center mb-4">
          <button
            onClick={loadMenuItems}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition text-sm disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : '🔄 Refresh Menu'}
          </button>
        </div>

        {}
        <div className="text-center mb-6">
          <button
            onClick={toggleFilters}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            {showFilters ? 'Hide Filters ⬆️' : 'Show Filters ⬇️'}
          </button>
        </div>

        {}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">Filter Menu</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option>All</option>
                  <option>Main Dishes</option>
                  <option>Drinks</option>
                  <option>Desserts</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option>All</option>
                  <option>₦0 - ₦2000</option>
                  <option>₦2000 - ₦5000</option>
                  <option>₦5000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option>Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && menuItems.length === 0 && (
          <div className="text-center p-8">
            <p className="text-gray-600 text-lg">Loading menu items...</p>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loading && menuItems.length === 0 ? (
            <div className="col-span-full text-center p-8">
              <p className="text-gray-600 text-lg mb-4">No menu items available yet.</p>
              <p className="text-gray-500 text-sm">Vendors can upload items from the Vendor Dashboard.</p>
            </div>
          ) : (
            menuItems.map((item) => (
              <div key={item.id} className="bg-white shadow-lg rounded-xl p-4 text-center hover:shadow-xl transition">
                <img 
                  src={item.image || item.image_url} 
                  className="rounded-lg w-full h-40 object-cover mb-4" 
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = '/media/item_images/placeholder.png';
                  }}
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                {item.description && (
                  <p className="text-gray-600 text-sm">{item.description}</p>
                )}
                <div className="mt-2 flex items-center justify-center gap-3">
                  <span className="font-bold text-orange-500">
                    ₦{parseFloat(item.price).toLocaleString()}
                  </span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="px-3 py-1 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Floating Cart Button */}
        <Link
          to="/cart"
          className="fixed bottom-6 right-6 bg-orange-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-orange-600 transition flex items-center gap-2 z-50"
        >
          🛒 Cart
        </Link>
      </section>
    </div>
  );
}

export default Menu;
