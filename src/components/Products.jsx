import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/cartContext";
import Cart from "./Cart";
import Login from "./Login";

function Products() {
  // State variables
  const [products, setProducts] = useState([]); // Products data
  const [showModal, setShowModal] = useState(false); // to control cart modal visibility
  const { cartItems, addToCart } = useContext(CartContext); // Cart context for managing cart state
  const [searchTerm, setSearchTerm] = useState(""); // Search term for product filtering
  const [priceFilter, setPriceFilter] = useState(""); // Price filter for product filtering
  const [token, setToken] = useState(""); // User authentication token

  // Handle user login
  const handleLogin = (newToken) => {
    setToken(newToken);
    // save token to localStorage for persistence
    localStorage.setItem("authToken", newToken);
  };

  // Fetch products from the API
  async function getProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        console.error("Failed to fetch products");
        return;
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  }

  // Fetch products on component mount
  useEffect(() => {
    getProducts();
  }, []);

  // Toggle cart modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // filter products based on the search term
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // filter based on the price
    .filter((product) => {
      if (priceFilter === "") return true; // no filter selected
      const price = parseFloat(product.price);
      switch (priceFilter) {
        case "under50":
          return price < 50;
        case "50to100":
          return price >= 50 && price <= 100;
        case "100andAbove":
          return price > 100;
        default:
          return true;
      }
    });

  // Render the login form if the user is not logged in
  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  // clear the authentication token from localStorage
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken("");
  };
  // Render the Products page if the user is logged in
  return (
    <>
      {/* HEADER */}
      <header className="d-flex justify-content-between mx-5">
        {/* SHOP TITLE */}
        <h1>SHOPHUB</h1>
        {/* FILTER BY NAME */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control m-2"
        />
        {/* FILTER BY PRICE */}
        <select
          className="form-select m-2"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">Filter By price</option>
          <option value="under50">Under $50</option>
          <option value="50to100">$50 - $100</option>
          <option value="100andAbove">$100 and Above</option>
        </select>
        {/* CART ICON AND CART COUNT */}

        {!showModal && (
          <button
            className="border-0 rounded bg-dark text-light px-3 py-2  m-auto d-flex"
            onClick={toggleModal}
          >
            <i className="bi bi-cart" color="black"></i>({cartItems.length})
          </button>
        )}

        {/* LOGOUT BUTTON */}
        <button className="btn btn-outline-danger m-2" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* PRODUCT CARDS */}
      <div className="d-flex flex-wrap justify-content-center">
        {filteredProducts.map((product) => (
          <div className="row" key={product.id}>
            <div className="col m-2">
              <div
                className="card h-100 p-3 border-0 shadow"
                style={{ width: "23rem" }}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="card-img-top img-fluid"
                  style={{ height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-uppercase fw-bold">
                    {product.title}
                  </h5>
                  <p className="card-text text-secondary">
                    {product.description.slice(0, 40)}...
                  </p>
                  <p className="card-text fw-semibold">{`$${product.price}`}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn btn-primary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* CART MODAL */}
      <Cart showModal={showModal} toggleModal={toggleModal} />
    </>
  );
}

export default Products;
