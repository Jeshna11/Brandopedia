import { foodItems } from "../data";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Home = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "Guest";

  const addToCart = async (item) => {
    const newItem = { ...item, quantity: 1 };
    setCart([...cart, newItem]);
    await axios.post("http://localhost:5000/cart", newItem);
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <i
          className="bi bi-arrow-left-circle fs-3"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        ></i>
        <div className="fw-bold text-center" style={{ flexGrow: 1 }}>
          {email}
        </div>
        <i
          className="bi bi-list fs-3"
          style={{ cursor: "pointer" }}
          title="Menu"
        ></i>
      </div>
      <h2 className="mb-4 fw-bold">Food List</h2>
      {foodItems.map((item) => (
        <div
          key={item.id}
          className="d-flex justify-content-between align-items-center border p-2 mb-2 rounded"
        >
          <div className="d-flex align-items-center gap-3">
            <img
              src={item.photo}
              className="rounded-circle image"
              alt={item.name}
            />
            <div>
              {item.name} - ₹{item.price}
            </div>
          </div>

          <button
            className="btn btn-sm btn-success"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      ))}
      <Link to="/cart" state={{ email }} className="btn btn-success mt-3">
        Go to Cart
      </Link>
    </div>
  );
};

export default Home;
