import React from 'react';
import axios from 'axios';

function Addproduct() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target[0].value;
        const description = e.target[1].value;
        const price = e.target[2].value;
        const category = e.target[3].value;
        const features = e.target[4].value;
        // Create an array of images from the input fields
        const mainImage = e.target[5].value;
        const additionalImage1 = e.target[6].value;
        const additionalImage2 = e.target[7].value;
        const additionalImage3 = e.target[8].value;
        const images = [mainImage, additionalImage1, additionalImage2, additionalImage3];

        const product = { title, description, price, category, features ,images };
        try {
            const response = await axios.post('https://soni-store-backend-fvgj.vercel.app/addproduct', product);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center py-8 px-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-8 text-gray-800">Add New Product</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Title</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" rows="3"></textarea>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Price</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Category</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Features</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" rows="3"></textarea>
                </div>

                
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Main Image URL</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Additional Image 1 URL</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Additional Image 2 URL</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Additional Image 3 URL</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                
                <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition duration-200">Submit</button>
            </form>

            {/* Sample product image */}
            <div className="mt-8">
                <img src="https://res.cloudinary.com/dalufhgmn/image/upload/v1731173198/Green_Line_Branch_Organic_Nature_Logo_rheefj.webp" alt="Product" className="w-32 h-32 rounded-full shadow-md" />
            </div>
        </div>
    );
}

export default Addproduct;
