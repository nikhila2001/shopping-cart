import { useContext } from "react";
import { CartContext } from "../context/cartContext";

// Cart component displays the items in the shopping cart
export default function Cart({ showModal, toggleModal }) {
    // Access cart-related functions and data from the CartContext
  const { cartItems, addToCart, removeFromCart, getCartTotal, clearCart } =
    useContext(CartContext);

  return (
    <>
          {/* Show the cart modal only if showModal is true */}
      {showModal && (
        <div className="cart-container">
                    {/* Modal structure for the cart */}
          <div
            className="modal fade show"
            id="cartModal"
            tabIndex="-1"
            aria-labelledby="cartModalLabel"
            aria-hidden="true"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                                {/* Modal header */}
                <div className="modal-header">
                  <h5 className="modal-title" id="cartModalLabel">
                    Cart
                  </h5>
                                    {/* Close button */}
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="close"
                    onClick={toggleModal}
                  ></button>
                </div>
                                {/* Modal body */}
                <div className="modal-body">
                  {cartItems.map((item) => (
                    <div className="row my-2" key={item.id}>
                      <div className="col-3">
                             {/* Display item image */}
                        <img
                          src={item.thumbnail}
                          alt={item.id}
                          className="img-fluid w-100"
                          style={{ height: "100px" }}
                        />
                      </div>
                      <div className="col-9">
                           {/* Display item details */}
                        <h5 className="mb-0 fw-bold">{item.title}</h5>
                        <p className="mb-0">{`$${item.price}`}</p>
                          {/* Quantity control */}
                        <div className="d-inline-flex justify-content-between count-container">
                             {/* Increase quantity button */}
                          <button
                            onClick={() => {
                              addToCart(item);
                            }}
                            className="border-0 rounded bg-dark text-light my-2 px-2 me-3 fw-bold"
                          >
                            +
                          </button>
                             {/* Display item quantity */}
                          <p className="m-auto ">{item.quantity}</p>
                           {/* Decrease quantity button */}
                          <button
                            className="border-0 rounded bg-dark text-light my-2 px-2 ms-3 fw-bold "
                            onClick={() => {
                              removeFromCart(item);
                            }}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                   {/* Display the total price of items in the cart */}
                  <h5 className="m-auto fw-bold text-secondary">
                    Total: ${getCartTotal()}
                  </h5>
                  {/* Button to clear the entire cart */}
                  <button onClick={clearCart}>Clear Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
