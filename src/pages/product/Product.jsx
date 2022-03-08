import { Link, useLocation } from "react-router-dom";
import "./product.css";
// import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);



  const [product, setProduct] = useState(
    useSelector((state) =>
      state.product.products.find((product) => product._id === productId)
    )
  );
  

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    if (file){
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const updatedProduct = { ...inputs, img: downloadURL, categories: cat, color: color, size: size};
            updateProduct(productId, updatedProduct, dispatch);
            setProduct(updatedProduct)
            NotificationManager.success('Product updated successfully', 'Success Notification')
          });
        }
      );
    } else{
      const updatedProduct = { ...inputs, img: product.img, categories: cat, color: color, size: size};
      updateProduct(productId, updatedProduct, dispatch);
      setProduct(updatedProduct)
      NotificationManager.success('Product updated successfully', 'Success Notification')
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Title</label>
            <input type="text" name="title"  placeholder={product.title} onChange={handleChange} />
            <label>Product Description</label>
            <input type="text" name="desc" placeholder={product.desc} onChange={handleChange} />
            <label>Categories</label>
            <input type="text" name="categories" placeholder={product.categories} onChange={handleCat} />
            <label>Sizes</label>
            <input type="text" name="size" placeholder={product.size} onChange={handleSize} />
            <label>Colors</label>
            <input type="text" name="color" placeholder={product.color} onChange={handleColor} />
            <label>Price</label>
            <input type="number" min = '0' name="price" placeholder={product.price} onChange={handleChange} />
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <button className="productButton" onClick={handleClick}>Update</button>
          </div>
        </form>
      </div>
      <NotificationContainer/>
    </div>

  );
}