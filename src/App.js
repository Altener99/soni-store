import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import Products from './Pages/Products';
import ProductDetails from './components/ProductDetails';
import About from './Pages/About';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Cart from './Pages/Cart';
import { AuthProvider } from './context/AuthContext';
import Addproduct from './Pages/Addproduct';
import Orders from './Pages/Orders';
import Profile from './Pages/Profile';

function App() {
  return (
    <AuthProvider>

    <Router>
      <div>
        <Routes>
          {/* Use element={<Component />} instead of component={Component} */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/SignIn" element={<SignIn/>} />
          <Route path="/Signup" element={<SignUp/>} />  
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/addproduct" element={<Addproduct/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
