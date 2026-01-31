function AdminDashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </nav>

      <section className="p-8">
        <h2 className="text-2xl font-bold mb-4">Manage Menu</h2>
        <p className="mb-6">Here the admin can add, edit, or remove dishes.</p>
 
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="text-gray-600">🔧 later. for django fixes.</p>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
