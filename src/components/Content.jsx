import React from 'react';
import image2 from './images/image2.webp';
import image3 from './images/image3.jpg';
import image4 from './images/image4.png';
import image6 from './images/screen-1.jpg';
import image7 from './images/image7.jpg';
import image8 from './images/image8.jpg';
import image9 from './images/image9.avif';
import image10 from './images/image10.jpg';
import image11 from './images/image11.webp';
import image12 from './images/image12.webp';
import { Link } from 'react-router-dom';

function Content() {
  return (
    <div className='bg-amber-100'>
      <h1 className="text-3xl font-bold text-center pt-8">Our Products</h1>
      <div className="flex flex-col justify-center md:flex-row gap-4 p-4 ">
        {/** Product items **/}
        <div className="relative rounded-3xl min-w-80 min-h-40 text-center overflow-hidden ">
          <div 
            style={{
              backgroundImage: `url(${image2})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'black',
              filter: 'brightness(50%)',
            }}
            className="absolute inset-0 hover:scale-150 hover:filter hover:brightness-[100%] transition duration-500 ease-in-out"
          ></div>
         <Link to={`/products?category=Daily Needs`}> <div className="relative z-10 text-white p-0 w-fit left-[165px] top-[60px] md:left-[100px]">
            <h1 className="text-2xl font-bold">Daily needs</h1>
          </div></Link>
        </div>
        <div className="relative rounded-3xl min-w-80 min-h-40 text-center overflow-hidden ">
          <div 
            style={{
              backgroundImage: `url(${image3})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'black',
              filter: 'brightness(50%)',
            }}
            className="absolute inset-0 hover:scale-150 hover:filter hover:brightness-[100%] transition duration-500 ease-in-out"
          ></div>
         <Link to={`/products?category=Snacks`}><div className="relative z-10 text-white p-0 w-fit left-[165px] top-[60px] md:left-[100px]">
            <h1 className="text-2xl font-bold">Snacks</h1>
          </div></Link> 
        </div>
        <div className="relative rounded-3xl min-w-80 min-h-40 text-center overflow-hidden ">
          <div 
            style={{
              backgroundImage: `url(${image4})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'black',
              filter: 'brightness(50%)',
            }}
            className="absolute inset-0 hover:scale-150 hover:filter hover:brightness-[100%] transition duration-500 ease-in-out"
          ></div>
         <Link to={`/products?category=Cooking`} > <div className="relative z-10 text-white p-0 w-fit left-[165px] top-[60px] md:left-[100px]">
            <h1 className="text-2xl font-bold">Cooking</h1>
          </div></Link>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-center mt-8">What We Offer</h1>
      
      <div className='p-24'>
        <div className='flex flex-col md:flex-row gap-12 mb-24'>
          <img className='w-[100%] rounded-[200px] shadow-lg md:w-[50%]' src={image6} alt="" />
          <div className='text-lg content-center'>
            <h1 className='font-bold text-center text-2xl mb-4'>Quality Products</h1>
            <p>
              At our store, we take pride in offering a diverse selection of premium products designed to meet the everyday needs of our valued customers. Our commitment to quality ensures that each item available on our platform meets rigorous standards, allowing us to build trust and loyalty with every purchase.
            </p>
            <p className="mt-4 ">
              By prioritizing authenticity and excellence, we aim to enhance the shopping experience and exceed customer expectations.
            </p>
          </div>
        </div>

        <div className='flex flex-col md:flex-row-reverse gap-12 mb-12'>
          <img className='w-[100%] rounded-[200px] shadow-lg md:w-[50%]' src={image7} alt="" />
          <div className='text-lg content-center'>
          <h1 className='font-bold text-center text-2xl mb-4'>Affordability</h1>

            <p>
              The products are sold at affordable prices, ensuring that you can access the best in health and wellness without breaking the bank. Our commitment to affordability is rooted in our belief that everyone deserves access to high-quality products that promote well-being.
            </p>
            <p className="mt-4">
              Embrace a healthier lifestyle with our commitment to organic and sustainable options for you and your family.
            </p>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-12 mb-12'>
          <img className='w-[100%] rounded-[200px] shadow-lg md:w-[50%] ' src={image8} alt="" />
          <div className='text-lg justify-center content-center'>
          <h1 className='font-bold text-center text-2xl mb-4'>Variety</h1>

            <p>
              Discover an extensive range of wellness and personal care products, crafted to keep you feeling your best every day. From skincare essentials to wellness supplements, each product is chosen with your well-being in mind.
            </p>
            <p className="mt-4">
              Our health-focused offerings ensure you get the best for self-care, promoting a balanced and fulfilling lifestyle.
            </p>
          </div>
        </div>
      </div>


      <h1 className="text-3xl font-bold text-center mt-8">Shop by Lifestyle</h1>

<div className="flex flex-wrap justify-center gap-6 p-8">
  {[
    { title: "Fitness Essentials", img: image9, description: "Nourish your workouts with our fitness-focused products." },
    { title: "Family-Friendly", img: image10, description: "Groceries and snacks everyone will love!" },
    { title: "Organic Choices", img:image11, description: "Fresh, organic options for a healthier you." },
    { title: "Quick & Easy Meals", img:image12, description: "Convenient foods that make mealtime simple." }
  ].map((category, index) => (
    <div key={index} className="relative w-[250px] h-[300px] rounded-3xl overflow-hidden shadow-lg bg-white">
      <img src={category.img} alt={category.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-opacity-50 bg-black flex flex-col justify-center items-center text-white p-4">
        <h2 className="text-xl font-bold mb-2">{category.title}</h2>
        <p className="text-center">{category.description}</p>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}

export default Content;
