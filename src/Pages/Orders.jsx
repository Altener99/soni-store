import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const fetchOrders = async () => {

            try{

                const token = localStorage.getItem('authToken');
                console.log(token);
              await axios.get('https://soni-store-backend-fvgj.vercel.app/getorders', { headers: { Authorization: `Bearer ${token}` }}).then((response) => {
                    console.log(response.data);
                    setOrders(response.data);
                }).catch((error) => {
                    console.error(error);
                });

            }
            catch(error)
            {
                console.log(error);   
            }


        }

        fetchOrders();

    },[]);

  return (
    <div className=" bg-gray-100">
      <Navbar/>
      <div className="max-w-4xl mx-auto py-48 min-h-screen">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Your Orders</h1>
        <p className="text-gray-600 mb-8">Track and manage all your recent orders here.</p>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-200"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{order.title}placeholder</h2>
                  <div className='flex gap-8'>
                  <img className='w-24' src={order.image} alt="" />
                  <div>
                  <p className="text-gray-500">Date: {order.date}</p>
                  <p className="text-gray-500">Status: <span className={`font-semibold ${order.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'}`}>{order.status}</span></p>
                  <p className="text-gray-500">Quantity: <span className="font-semibold">{order.quantity}</span></p>

                  </div>
                  </div>


                </div>
                <div>
                    <p className='text-sm font-thin text-gray-600'>order # {order._id}</p>
                  <p className="text-xl font-semibold text-gray-800">{order.total}</p>
                  <button className="mt-2 px-4 py-1 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none">
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">You have no orders at the moment.</p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Orders;
