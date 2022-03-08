import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import TransactionList from "./pages/transactionList/TransactionList";
import Transaction from "./pages/transaction/Transaction";


import React, {Fragment} from 'react';
import { useSelector } from "react-redux";

function App() {
  const admin = useSelector((state) => {
    if(state.user.currentUser){
      return state.user.currentUser.isAdmin
    }
    return false
  });
  return (
    <Router>
        {admin && (
          <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Routes>
                  <Route exact path="/"  element={<Home />}/>
                  <Route path="/users" element={<UserList />}/>
                  <Route path="/user/:userId" element={<User />}/>
                  <Route path="/newUser" element={<NewUser />}/>
                  <Route path="/products" element={<ProductList />}/>
                  <Route path="/product/:productId" element={<Product />} />
                  <Route path="/newproduct" element={<NewProduct />} />
                  <Route path="/transactions" element={<TransactionList />} />
                  <Route path="/transaction/:orderId" element={<Transaction />} />
                </Routes>
              </div>
          </>
        )}

        {!admin && (
          <>
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
          </>
        )}    


    </Router>
  );
}


export default App;