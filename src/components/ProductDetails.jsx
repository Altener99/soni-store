import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import placeholderImage1 from './logo.webp'; // Use your product images here
import placeholderImage2 from './logo.webp';
import placeholderImage3 from './logo.webp';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [products, setProducts] = useState(null);
  const [responseId, setResponseId] = React.useState("");
  const [responseState, setResponseState] = React.useState([]);
  const navigate = useNavigate();


  const {productId} = useParams();
  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://soni-store-backend-fvgj.vercel.app/products/${productId}`);
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };  
    fetchProducts();  

  },[]);

  if(!products) return <h1>Loading...</h1>;

  const images = products.images;



  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = (product) => {
    console.log(product);
    const title = products.title;
    const price = products.price;
    const productId = products._id;
    const image = products.images[0];
    const itemquantity = quantity - 1;
    console.log(title, price, productId); 
    const token = localStorage.getItem('authToken');
    if(!token)
    {
        alert('Please log in to add items to cart');
    }
    else
    {
      console.log("access");
      axios.put(`https://soni-store-backend-fvgj.vercel.app/addtocart`, {title,price,productId,image,itemquantity}, { headers: { Authorization: `Bearer ${token}` }}).then((response) => {
        
        console.log(response.data);
        alert('Item added to cart');

    }).catch((error) => {
        console.error(error);
        alert('Error adding item to cart');
    }); }
    
  };

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

  const setOrders = async () => {

    const token = localStorage.getItem('authToken');
    // const orders = cartItems.map((item) => {
    //   return {
    //     productId: item.productId,
    //     title: item.title,
    //     price: item.price,
    //     quantity: item.quantity,
    //     image: item.image
    //   };
    // });

    const orders = {

      productId: products._id,
      title: products.title,
      price: products.price,
      quantity: quantity,
      image: products.images[0]


    }

    console.log(orders);  

    await axios.put('https://soni-store-backend-fvgj.vercel.app/setorders', {orders}, { headers: { Authorization: `Bearer ${token}` , orders:"true"}}).then((response) => {
      console.log(response.data);
      navigate('/orders');
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <div className="max-w-6xl  mx-auto pt-36 px-4 md:py-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Product Image and Thumbnails */}
          <div className="relative flex">
            {/* Thumbnails */}
            <div className="flex flex-col mr-4 space-y-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition transform duration-200 ${
                    currentImageIndex === index ? 'border-2 border-[#0078AD] scale-105' : 'opacity-70'
                  }`}
                />
              ))}
            </div>
            
            {/* Main Product Image */}
            <img
              className="w-[85%] h-[400px] md:h-[500px] object-cover rounded-lg shadow-md transition-all duration-500 ease-in-out"
              src={images[currentImageIndex]}
              alt={`Product Image ${currentImageIndex + 1}`}
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold text-[#0078AD]">{products.title}</h1>
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span className="ml-4 text-gray-600">(120 reviews)</span>
            </div>
            <p className="text-lg text-gray-700">
              {products.features}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold text-[#0078AD]">₹{products.price}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDecrease}
                    className="bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#0078AD] hover:text-white transition duration-200"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={handleIncrease}
                    className="bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#0078AD] hover:text-white transition duration-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddToCart}
                className="bg-[#0078AD] text-white px-8 py-2 rounded-full font-semibold flex items-center space-x-2 hover:bg-[#005f87] transition duration-200"
              >
                <AiOutlineShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
              <button onClick={() => {createRazorpayOrder(parseFloat(products.price) + 5);  }} className="bg-gray-200 text-gray-800 px-8 py-2 rounded-full font-semibold hover:bg-gray-300 transition duration-200">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-[#0078AD] mb-4">Product Description</h2>
          <p className="text-lg text-gray-700">
            {products.description}
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ProductDetails;