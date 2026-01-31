import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find matching customer user
    let user = users.find(u => u.email === email && u.password === password && u.role === 'customer');

    if (!user) {
      alert('Invalid login credentials or not a customer account!');
      return;
    }

    // Store logged-in user
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Redirect to menu page for customers
    navigate('/menu');
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">
          Customer Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-teal-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-teal-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Dont have an account?{' '}
          <Link to="/signup" className="text-teal-500 hover:underline">
            Sign up here
          </Link>
        </p>
        
        <p className="mt-2 text-sm text-center">
          Are you a vendor?{' '}
          <Link to="/vendor-login" className="text-teal-500 hover:underline">
            Vendor Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CustomerLogin;
