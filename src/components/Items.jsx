import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function Items() {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');
  const category = new URLSearchParams(location.search).get('category');


  const categories = ['All', 'Snacks', 'Cooking', 'Wellness', 'Daily Needs'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://soni-store-backend-fvgj.vercel.app/products');
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if(category) {
      setSelectedCategory(category);
      console.log(category);
    }

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-700">Loading Products...</h1>
        </div>
      </div>
    );
  }
  
  // Filter products by search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = !searchQuery || product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const addToCart = (product) => {
    const { title, price, _id: productId, images } = product;
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('Please log in to add items to cart');
    } else {
      axios
        .put(
          `https://soni-store-backend-fvgj.vercel.app/addtocart`,
          { title, price, productId, image: images[0] },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          alert('Item added to cart');
        })
        .catch(() => {
          alert('Error adding item to cart');
        });
    }
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Header Section */}
      <div className="text-center py-16 bg-[#0078AD] text-white">
        <h1 className="text-5xl font-bold mb-4">Discover Our Collection</h1>
        <p className="text-lg max-w-xl mx-auto">
          Browse through our premium selection of products crafted to bring value and satisfaction to every customer.
        </p>
      </div>

      {/* Category Selector */}
      <div className="container mx-auto px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-semibold text-gray-800">Results:</div>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1); // Reset to page 1 when changing category
            }}
            className="px-4 py-2 bg-gray-200 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0078AD] text-gray-700"
          >
            
            {categories.map((category) => (
              <option key={category} value={category}>
               {category}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600">
            No products found for "{searchQuery}" in "{selectedCategory}".
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {displayedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 relative overflow-hidden"
              >
                <Link to={`/products/${product._id}`}>
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-cover h-full w-full transform hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">{product.title}</h2>
                    <p className="text-xl font-bold text-[#0078AD]">₹{product.price}</p>
                  </div>
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="mt-6 w-full py-2 bg-[#0078AD] text-white font-semibold rounded-lg hover:bg-[#005F87] transition duration-200"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && (
        <div className="flex justify-center space-x-2 pb-8">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition duration-200"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? 'bg-[#0078AD] text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              } transition duration-200`}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition duration-200"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Items;
