import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  // Sample cart data

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [responseId, setResponseId] = React.useState("");
  const [responseState, setResponseState] = React.useState([]);


  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }

      document.body.appendChild(script);
    })
  }

  const createRazorpayOrder = (amount) => {
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR"
    })

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://soni-store-backend-fvgj.vercel.app/orders",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
      handleRazorpayScreen(response.data.amount)
    })
    .catch((error) => {
      console.log("error at", error)
    })
  }

  const handleRazorpayScreen = async(amount) => {
    const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      alert("Some error at razorpay screen loading")
      return;
    }

    const options = {
      key: 'rzp_test_nuYNLFgh8yEQ3O',
      amount: amount,
      currency: 'INR',
      name: "Soni Store",
      description: "payment to Soni Store",
      image: "https://papayacoders.com/demo.png",
      handler: function (response){
        setResponseId(response.razorpay_payment_id)
      },
      prefill: {
        name: "Soni Store",
        email: "user1@gmail.com"
      },
      theme: {
        color: "#F4C430"
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  const paymentFetch = (e) => {
    e.preventDefault();

    const paymentId = e.target.paymentId.value;

    axios.get(`https://soni-store-backend-fvgj.vercel.app/payment/${paymentId}`)
    .then((response) => {
      console.log(response.data);
      setResponseState(response.data)
    })
    .catch((error) => {
      console.log("error occures", error)
    })
  }

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://soni-store-backend-fvgj.vercel.app/cart', { headers: { Authorization: `Bearer ${token}` } });
        console.log(response.data);
        setCartItems(response.data);
      } catch (error) {
        if(localStorage.getItem('authToken') === null)
        {
          navigate('/signin');
        }
        else
        {
          console.error(error);
        }
      }
    };
    fetchCartItems();
  }, []);

  console.log(cartItems);

  // Calculate total
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  // Handle item quantity increase/decrease
  const updateQuantity = (id, increment) => {
   const token = localStorage.getItem('authToken');
    axios.put(`https://soni-store-backend-fvgj.vercel.app/cart/${id}`, { quantity: increment }, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      setCartItems(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    }); 
  };

  // Handle item removal
  

    // setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

   const removeItem = async (id) => {
    console.log(id);
    const token = localStorage.getItem('authToken');
    await axios.delete(`https://soni-store-backend-fvgj.vercel.app/cart/${id}`, { headers
: { Authorization: `Bearer ${token}` } }).then((response) => {
      setCartItems(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    });
  
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto py-12 px-6 lg:px-20">
        <motion.h1 
          className="text-4xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg shadow-sm"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.productId, -1)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-4 text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, 1)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-gray-800 mr-4">
                    ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-600">Your cart is empty.</p>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800">₹40.00</span>
            </div>
            <div className="flex justify-between mb-8 border-t pt-4">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-lg font-bold text-gray-800">₹{(parseFloat(totalAmount) + 5).toFixed(2)}</span>
            </div>
            <button onClick={() => createRazorpayOrder(parseFloat(totalAmount) + 5)}
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
