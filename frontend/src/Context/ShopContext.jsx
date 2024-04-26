import React, { createContext, useState, useEffect } from "react";
// import all_product from '../Components/Assets/all_product'


export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
}
  

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [all_product, setAll_Product] = useState([]);

    useEffect(()=>{
        fetch('https://shopper-y4ja.onrender.com/allproducts')
        .then((response) => response.json())
        .then((data) => setAll_Product(data));

        if(localStorage.getItem('auth-token')){
            fetch('https://shopper-y4ja.onrender.com/getcart',{
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:"",
            }).then((response) => response.json())
            .then((data) => setCartItems(data));
        }
    },[])


    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
              fetch('https://shopper-y4ja.onrender.com/addtocart',{
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId})
              })
              .then((response) => response.json())
              .then((data) => console.log(data));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('https://shopper-y4ja.onrender.com/removefromcart',{
              method: 'POST',
              headers:{
                  Accept: 'application/form-data',
                  'auth-token': `${localStorage.getItem('auth-token')}`,
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({"itemId": itemId})
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
      }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product) => {
                    return product.id === Number(item);
                })
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }
    
    const getTotalCartItems = () => {
        let totalItems = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }


    const contextValue = {all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider;