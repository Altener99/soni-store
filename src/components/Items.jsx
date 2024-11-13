import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Items() {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);   
  
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
    fetchProducts();
  }, []);
  
  // Simulated product data
  // const products = Array.from({ length: 40 }, (_, i) => ({
  //   id: i + 1,
  //   name: `Product ${i + 1}`,
  //   price: (Math.random() * 50 + 10).toFixed(2),
  // }));

  // Calculate the products to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Function to handle page change
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const fecthtoken = async () => await localStorage.getItem('authToken');

  // Function to handle adding to cart
  const addToCart = (product) => {

    const title = product.title;
    const price = product.price;
    const productId = product._id;
    const image = product.images[0];
    const token = localStorage.getItem('authToken');
    if(!token)
    {
        alert('Please log in to add items to cart');
    }
    else
    {
      console.log("access");
      axios.put(`https://soni-store-backend-fvgj.vercel.app/addtocart`, {title,price,productId,image}, { headers: { Authorization: `Bearer ${token}` }}).then((response) => {
        
        console.log(response.data);
        alert('Item added to cart');

    }).catch((error) => {
        console.error(error);
        alert('Error adding item to cart');
    }); }
    // Implement add-to-cart functionality here
  };

  return (
    <div className="pt-24">
      <div className="text-center py-16 bg-[#0078AD] text-white">
        <h1 className="text-5xl font-bold mb-4">Discover Our Collection</h1>
        <p className="text-lg max-w-xl mx-auto">
          Browse through our premium selection of products crafted to bring value and satisfaction to every customer.
        </p>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {/* Displayed Product Cards */}
          {displayedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 relative overflow-hidden"
            >
              {/* Link only wraps the image and title */}
              <Link to={`/products/${product._id}`}>
                {/* Product Image */}
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover h-full w-full transform hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-semibold text-gray-800">{product.title}</h2>
                
                  <p className="text-xl font-bold text-[#0078AD]">${product.price}</p>
                </div>
              </Link>

              {/* "Add to Cart" Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation to product details page
                  addToCart(product);
                }}
                className="mt-6 w-full py-2 bg-[#0078AD] text-white font-semibold rounded-lg hover:bg-[#005F87] transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
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
    </div>
  );
}

export default Items;