import { Link, useLocation } from "react-router-dom";
import "./transaction.css";
// import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function Product() {
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];

console.log(orderId)

  const [order, setOrder] = useState(
    useSelector((state) =>
      state.transaction.transactions.find((transaction) => transaction._id === orderId)
    )
  );
  
  console.log(order.products)

  return (
    <div className="Order">
        <form className="orderForm">
            <div className="orderContent">
                <div className= 'group'>
                    <label>User ID: </label>
                    <span>{order.userId}</span>
                </div>
                <div className= 'group'>
                    <label>Products: </label>
                    {
                        order.products.map(product =>
                            <ul key = {product.productId}>
                                <li><span>ProductID: </span><Link to ={"/product/" + product.productId}>{product.productId}</Link></li>
                                <li><span>Quantity: </span>{product.quantity}</li>
                                <li><span>Color: </span>{product.color}</li>
                            </ul>
                        )
                    }
                    <span></span>
                </div>
                <div className= 'group'>
                    <label>Amount: </label>
                    <span>{order.amount}</span>
                </div>
                <div className= 'group'>
                    <label>Address: </label>
                    <span>{order.address}</span>
                </div>
                <div className= 'group'>
                    <label>Status: </label>
                    <span className="status">{order.status}</span>
                </div>
            </div>
        </form>
      <NotificationContainer/>
    </div>

  );
}