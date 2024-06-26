import './AddProduct.css'
import upload_area from '../../Assets/upload_area.svg'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const [image,setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);

        try {
          const response = await fetch('https://shopper-y4ja.onrender.com/upload', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
            body: formData,
          });
          const data = await response.json();
          responseData = data;

        } catch (error) {
          console.error('Error:', error);
        }

        if(responseData.success){
          product.image = responseData.image_url;
          console.log(product);
          try {
            const response = await fetch('https://shopper-y4ja.onrender.com/addproduct', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(product),
            });
          
            const data = await response.json();
          
            if (data.success) {
              toast.success("Product added successfully");
            } else {
              toast.error("Failed to add product. Please try again.");
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
        else{
          console.log("Error");
        }
    }

  return (
    <>
      <ToastContainer />
      <div className="add-product">
        <div className="addproduct-itemfield">
          <p>Product title</p>
          <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here'/>
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
              <p>Price</p>
              <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here'/>
          </div>
          <div className="addproduct-itemfield">
              <p>Offer Price</p>
              <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here'/>
          </div>
        </div>
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kids</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
              <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
          </label>
          <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>
        <button onClick={() => {Add_Product()}} className='addproduct-btn'>Add</button>
      </div>
    </>
  )
}

export default AddProduct
