import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function CustomerLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://makeameal.onrender.com/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Invalid credentials');
      }

      const data = await response.json();
      
      // Check if user is a customer (not a vendor)
      if (data.user.role === 'vendor') {
        setError('This is a vendor account. Please use vendor login.');
        return;
      }
      
      // Store tokens
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      
      // Store user info
      localStorage.setItem('currentUser', JSON.stringify(data.user));

      // Redirect to menu page for customers
      navigate('/menu');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">
          Customer Login
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-teal-300"
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
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