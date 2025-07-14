import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) return (
    <div className="text-center p-5">
      <h2 className="fw-bold mb-4">Your Cart</h2>
      <p>Your cart is empty. Start shopping for sports equipment!</p>
      <Link to="/products" className="btn btn-primary mt-3">Shop Products</Link>
    </div>
  );
  
  return (
    <div className="p-3 p-md-5">
      <h2 className="fw-bold mb-4">Your Cart</h2>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Size</th>
            <th>Color</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>{item.category}</td>
              <td>{item.size}</td>
              <td>{item.color}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-outline-danger" onClick={clearCart}>Clear Cart</button>
        <h4 className="fw-bold">Total: ${total.toFixed(2)}</h4>
        <Link to="/checkout" className="btn btn-success btn-lg">Proceed to Checkout</Link>
      </div>
    </div>
  );
}

export default Cart;
