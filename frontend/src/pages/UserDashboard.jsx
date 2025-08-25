import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useProducts } from "../context/ProductContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { ShoppingCart, User, Package, LogOut, ArrowLeft } from "lucide-react";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { products, searchProducts } = useProducts();
  const { items, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("products");

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  // Initialize filtered products
  useEffect(() => {
    if (products && products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  // Filter products based on category and search
  useEffect(() => {
    if (!products || products.length === 0) return;

    let filtered = [...products];

    if (selectedCategory !== "All Products") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery && searchQuery.trim()) {
      const searchResults = searchProducts(searchQuery);
      if (selectedCategory !== "All Products") {
        filtered = searchResults.filter(
          (product) => product.category === selectedCategory
        );
      } else {
        filtered = searchResults;
      }
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery, searchProducts]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality is handled by useEffect
  };

  const categories = ["All Products", "Rice", "Millets", "Grains", "Pulses", "Seeds"];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                User Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-500 text-white mr-4">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Cart Items</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-500 text-white mr-4">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Account Type
                </p>
                <p className="text-2xl font-bold text-gray-900">User</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "products", name: "Browse Products" },
                { id: "cart", name: "My Cart" },
                { id: "orders", name: "My Orders" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "products" && (
              <div>
                {/* Search and Filter */}
                <div className="mb-6">
                  <form onSubmit={handleSearch} className="mb-4">
                    <div className="relative max-w-md">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </form>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "cart" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Shopping Cart
                </h3>
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <button
                      onClick={() => setActiveTab("products")}
                      className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {item.product.name}
                              </h4>
                              <p className="text-gray-600">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ₹{item.product.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-orange-600">
                          ₹{totalPrice}
                        </span>
                      </div>
                      <button
                        onClick={() => navigate("/checkout")}
                        className="w-full mt-4 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Order History
                </h3>
                <p className="text-gray-500">
                  Your order history will appear here once you place orders.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
