import { createContext, useState, useEffect } from 'react';

// Create a context for managing the shopping cart state and functions
export const CartContext = createContext();
// CartProvider component manages the state and provides functions related to the shopping cart
export const CartProvider = ({children}) => {
    // State variable to store the items in the cart
    const[cartItems, setCartItems] = useState([]);
   // Function to add an item to the cart
    const addToCart = (item) => {
        // Check if the item is already in the cart
        
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id); // check if the item is already in the cart
        if(isItemInCart) {
            setCartItems(
                cartItems.map((cartItem) => // if the item is already in the cart, increase te quantity of te item
                cartItem.id === item.id ? {...cartItem,quantity: cartItem.quantity + 1}:
                cartItem // otherwise, return the cart
                )
            )
        } else {
            setCartItems([...cartItems, {...item, quantity: 1}]); // if the item is not in the cart, add the item
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = (item) => {
        // Find the item in the cart
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
        // Update the cart based on the item's quantity
        if (isItemInCart && isItemInCart.quantity === 1) {
            // If the quantity is 1, remove the item from the cart
        setCartItems(cartItems.filter((cartItem) => cartItem.id !==item.id)); // if the quantity of the item is 1, remove the item frm the cart
        } else {
             // If the quantity is more than 1, decrease the quantity
            setCartItems(
                cartItems.map((cartItem) => 
                cartItem.id === item.id 
                ? {...cartItem, quantity: cartItem.quantity -1} // if the quantity of thr item is more than 1, decrease the quantity of the item
                : cartItem
                )
            );
        }

    };
     // Function to clear the entire cart
    const clearCart = () => {
        setCartItems([]);
      };

     // Function to calculate the total price of items in the cart
    const getCartTotal = () => {
        return cartItems.reduce((total,item) => total + item.price * item.quantity,0) // calculate the total price of the items in the cart
    }
     // Save cartItems to localStorage whenever it changes
    useEffect(()=> {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },[cartItems]);
    
    // Load cartItems from localStorage on component mount
    useEffect(()=> {
        const cartItems = localStorage.getItem("cartItems");
        if(cartItems) {
            setCartItems(JSON.parse(cartItems));
        } 
    },[])
    // Provide the cart state and functions to the components in the tree

    return(
        <>
        <CartContext.Provider
        value={{
            cartItems,
            addToCart,
            removeFromCart,
            getCartTotal,
            clearCart
        }}
        >
         {children}
        </CartContext.Provider>
        </>
    )
}