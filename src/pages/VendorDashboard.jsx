import { useState, useEffect } from 'react';
import { menuAPI, vendorAPI } from '../services/apiService';

function VendorDashboard() {
  const [foodItems, setFoodItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load vendor's items on component mount
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      // Try to fetch from API first
      const data = await vendorAPI.getMyMenuItems();
      setFoodItems(data);
    } catch (err) {
      console.error('Error loading items:', err);
      // Fallback to localStorage
      const items = JSON.parse(localStorage.getItem('foodItems')) || [];
      setFoodItems(items);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Create FormData for file upload
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('price', formData.price);
      formDataObj.append('description', formData.description || '');
      if (formData.image) {
        formDataObj.append('image', formData.image);
      }

      // Upload to Django API
     // const newItem = await menuAPI.uploadMenuItem(formDataObj);
      
      setSuccess('Food item added successfully!');
      
      // Reload items
      await loadItems();

      // Reset form
      setFormData({
        name: '',
        price: '',
        description: '',
        image: null
      });
      
      // Reset file input
      e.target.reset();

    } catch (err) {
      setError(err.message || 'Failed to add food item');
      console.error('Upload error:', err);
      
      // Fallback to localStorage
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = event.target.result;
        let items = JSON.parse(localStorage.getItem('foodItems')) || [];
        items.push({ 
          name: formData.name, 
          price: formData.price, 
          description: formData.description,
          image 
        });
        localStorage.setItem('foodItems', JSON.stringify(items));
        loadItems();
        setSuccess('Item saved locally');
      };
      
      if (formData.image) {
        reader.readAsDataURL(formData.image);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id, index) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      // Try to delete from API
      if (id) {
        await menuAPI.deleteMenuItem(id);
      }
      
      setSuccess('Item deleted successfully!');
      
      // Reload items
      await loadItems();
      
    } catch (err) {
      console.error('Delete error:', err);
      
      // Fallback to localStorage
      let items = JSON.parse(localStorage.getItem('foodItems')) || [];
      items.splice(index, 1);
      localStorage.setItem('foodItems', JSON.stringify(items));
      loadItems();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">
          Upload Food Item
        </h2>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block mb-1">Food Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-1">Price (₦) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-1">Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
              rows="3"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-1">Upload Image *</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full border rounded-lg px-3 py-2"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-orange-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding Food...' : 'Add Food'}
          </button>
        </form>

        {/* Food Items List */}
        <h3 className="text-xl font-bold text-gray-700 mb-4">Your Uploaded Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {foodItems.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No items uploaded yet. Add your first item!
            </p>
          ) : (
            foodItems.map((item, index) => (
              <div key={item.id || index} className="bg-gray-50 shadow rounded-xl p-4 flex flex-col">
                <img
                  src={item.image || item.image_url}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                  onError={(e) => {
                    e.target.src = '/media/item_images/placeholder.png';
                  }}
                />
                <h3 className="text-lg font-bold">{item.name}</h3>
                {item.description && (
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                )}
                <p className="text-gray-600 mb-3">₦{parseFloat(item.price).toLocaleString()}</p>
                <button
                  onClick={() => deleteItem(item.id, index)}
                  className="bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;
