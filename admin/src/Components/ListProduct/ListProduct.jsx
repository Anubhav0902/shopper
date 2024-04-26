import { useEffect, useState } from "react";
import "./ListProduct.css";
import remove_icon from '../../Assets/cross_icon.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

   
  const remove_product = async (id) => {
    try {
      const response = await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      });
    
      if (response.ok) {
        toast.success("Product removed successfully");
        await fetchInfo();
      } else {
        toast.error("Failed to remove product. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <>
      <ToastContainer />
      <div className="list-product">
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
            <hr />
            {allproducts.length > 0 ? (
              allproducts.map((product, index) => (
                <div key={index} className="listproduct-format-main listproduct-format">
                  <img src={product.image} alt="" className="listproduct-product-icon" />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p>
                  <img onClick={() => { remove_product(product.id) }} className="listproduct-remove-icon" src={remove_icon} alt="" />
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
            <hr />
        </div>
      </div>
    </>
  );
};

export default ListProduct;
