import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Cart = ({ cart }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  if (!email) return null; 

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <i
          className="bi bi-arrow-left-circle fs-3"
          onClick={() => navigate("/home", { state: { email } })}
          style={{ cursor: "pointer" }}
        ></i>
        <div className="fw-bold text-center" style={{ flexGrow: 1 }}>
          {email}
        </div>
        <i className="bi bi-list fs-3" style={{ cursor: "pointer" }} title="Menu"></i>
      </div>

      <h2 className="text-center mb-4 fw-bold">Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="list-group mb-4">
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span className="d-flex align-items-center gap-3">
                <img src={item.photo} className="rounded-circle image"/> 
                {item.name} x {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      )}

      <h4 className="text-center">Total: ₹{total}</h4>

      <div className="d-flex justify-content-center mt-4">
        <Link to="/home" state={{ email }} className="btn btn-success">
          Place order
        </Link>
      </div>
    </div>
  );
};

export default Cart;
