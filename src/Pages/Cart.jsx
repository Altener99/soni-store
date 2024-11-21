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
  const [addresses, setAddresses] = useState([]);
const [selectedAddress, setSelectedAddress] = useState("");
const [newAddress, setNewAddress] = useState({
  name: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
});

const [isModalOpen, setIsModalOpen] = useState(false);



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
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

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
      handler: async function (response){
        setResponseId(response.razorpay_payment_id);
        await setOrders();
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

    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("https://soni-store-backend-fvgj.vercel.app/address", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
    fetchCartItems();
  }, []);

  // useEffect(() => {
  //   const fetchAddresses = async () => {
  //     try {
  //       const token = localStorage.getItem("authToken");
  //       const response = await axios.get("https://soni-store-backend-fvgj.vercel.app/address", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setAddresses(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching addresses:", error);
  //     }
  //   };

  //   fetchAddresses();
  // }, [newAddress]);

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

  // const setOrders = () => {
  //   try{
  //     const token = localStorage.getItem('authToken');
  //     axios.post('https://soni-store-backend-fvgj.vercel.app/orders', { headers: { Authorization: `Bearer ${token}` }}).then((response) => {
  //       console.log(response.data);
  //       setOrders(response.data);
  //     }).catch((error) => {
  //       console.error(error);
  //     });
  //   }
  //   catch(error)
  //   {
  //     console.log(error);   
  //   }
  // }


  const setOrders = async () => {

    const token = localStorage.getItem('authToken');
    const orders = cartItems.map((item) => {
      return {
        productId: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      };
    });
    await axios.put('https://soni-store-backend-fvgj.vercel.app/setorders', {orders}, { headers: { Authorization: `Bearer ${token}` }}).then((response) => {
      console.log(response.data);
      navigate('/orders');
    }).catch((error) => {
      console.error(error);
    });
  }

  const addNewAddress = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "https://soni-store-backend-fvgj.vercel.app/address",
        newAddress,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddresses([...addresses, response.data]);
      setNewAddress({
        name: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
      });
      setIsModalOpen(false); 
        try {
          const token = localStorage.getItem("authToken");
          const response = await axios.get("https://soni-store-backend-fvgj.vercel.app/address", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAddresses(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto pt-32 pb-24 px-6 lg:px-20">
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
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 h-max">
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
          <div className="bg-white rounded-lg shadow-lg p-6 h-max">
            <h2 className="text-xl font-bold mb-4">Select Address</h2>
            <select
              className="w-full p-2 border rounded-lg mb-4"
              onChange={(e) => setSelectedAddress(e.target.value)}
              value={selectedAddress}
            >
              {addresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.name} - {address.city}
                </option>
              ))}
            </select>

            <h2 className="text-xl font-bold mt-6">Add New Address</h2>
            <button
              className="w-full py-2 bg-green-500 text-white rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Add Address
            </button>

            <h2 className="text-xl font-bold mt-6">Order Summary</h2>
            <p>Price: ₹{totalAmount}</p>
            <p>Shipping: ₹5.00</p>
            <p>Total: ₹{parseFloat(totalAmount) + parseFloat(5)}.00</p>
            <button
              className="w-full py-2 bg-blue-500 text-white rounded-lg mt-4"
              onClick={() => createRazorpayOrder(totalAmount)}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

       {/* Modal for Adding New Address */}
       {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <h2 className="text-xl font-bold mb-4">Add New Address</h2>
            <input
              type="text"
              placeholder="Name"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="Address Line 1"
              value={newAddress.addressLine1}
              onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="Address Line 2"
              value={newAddress.addressLine2}
              onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="State"
              value={newAddress.state}
              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                className="py-2 px-4 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addNewAddress} // Save new address
                className="py-2 px-4 bg-green-500 text-white rounded-lg"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Cart;
