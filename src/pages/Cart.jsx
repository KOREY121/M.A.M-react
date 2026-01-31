import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  // Initialize cart items from localStorage
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  };

  // Update quantity for an item
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Don't allow quantities less than 1
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    // Add your checkout logic here
    alert('Proceeding to checkout...');
    // You can navigate to a checkout page or integrate payment
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-orange-500 text-white py-4 px-6 text-center font-bold text-xl shadow-md relative">
        🛒 Your Cart (your order)
        <Link
          to="/menu"
          className="fixed top-6 left-6 bg-white text-gray-800 px-4 py-3 rounded-full shadow-lg hover:bg-orange-600 hover:text-white transition flex items-center gap-2 z-50"
        >
          Back
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-6">
        {cartItems.length === 0 ? (
          <div className="bg-white shadow-lg rounded-xl p-8 text-center">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <Link
              to="/menu"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition inline-block"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white shadow-lg rounded-xl p-4 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600">₦{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                      className="w-16 border rounded-lg p-1 text-center"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total and Checkout */}
            <div className="mt-6 bg-white shadow-lg rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-lg font-bold">
                Total: ₦{calculateTotal().toLocaleString()}
              </p>
              <button
                onClick={handleCheckout}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Cart;
