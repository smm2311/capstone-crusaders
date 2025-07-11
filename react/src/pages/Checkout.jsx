import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Checkout() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({
    billingFirst: '', billingLast: '', billingAddress: '', billingCity: '', billingState: '', billingZip: '',
    shippingFirst: '', shippingLast: '', shippingAddress: '', shippingCity: '', shippingState: '', shippingZip: '',
    sameAsBilling: false,
    cardNumber: '', cardName: '', cardExp: '', cardCvc: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const required = [
      'billingFirst','billingLast','billingAddress','billingCity','billingState','billingZip',
      'shippingFirst','shippingLast','shippingAddress','shippingCity','shippingState','shippingZip',
      'cardNumber','cardName','cardExp','cardCvc'
    ];
    for (let key of required) if (!form[key]) return setError('Please fill all fields.');
    if (cart.length === 0) return setError('Your cart is empty.');
    setError('');
    try {
      // 1. Create customer
      const customerRes = await fetch('http://localhost:3000/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const customerData = await customerRes.json();
      if (!customerData.customerId) throw new Error('Customer creation failed');
      // 2. Create orders for each product
      for (const item of cart) {
        await fetch('http://localhost:3000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerId: customerData.customerId, productId: item.id })
        });
      }
      clearCart();
      setSubmitted(true);
    } catch (err) {
      setError('Checkout failed. Please try again.');
    }
  }

  if (submitted) return (
    <div className="text-center p-5">
      <h2 className="fw-bold mb-3">Thank you for your order!</h2>
      <p>Your checkout was successful.</p>
      <Link to="/products" className="btn btn-primary mt-3">Continue Shopping</Link>
    </div>
  );

  return (
    <form className="row g-4" onSubmit={handleSubmit} autoComplete="off">
      <h2 className="fw-bold mb-4">Checkout</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Billing Info */}
      <div className="col-12 col-md-6">
        <h5 className="mb-3">Billing Information</h5>
        <input className="form-control mb-2" name="billingFirst" placeholder="First Name" value={form.billingFirst} onChange={e => setForm(f => ({...f, billingFirst: e.target.value}))} />
        <input className="form-control mb-2" name="billingLast" placeholder="Last Name" value={form.billingLast} onChange={e => setForm(f => ({...f, billingLast: e.target.value}))} />
        <input className="form-control mb-2" name="billingAddress" placeholder="Address" value={form.billingAddress} onChange={e => setForm(f => ({...f, billingAddress: e.target.value}))} />
        <input className="form-control mb-2" name="billingCity" placeholder="City" value={form.billingCity} onChange={e => setForm(f => ({...f, billingCity: e.target.value}))} />
        <input className="form-control mb-2" name="billingState" placeholder="State" value={form.billingState} onChange={e => setForm(f => ({...f, billingState: e.target.value}))} />
        <input className="form-control mb-2" name="billingZip" placeholder="ZIP" value={form.billingZip} onChange={e => setForm(f => ({...f, billingZip: e.target.value}))} />
      </div>
      {/* Shipping Info */}
      <div className="col-12 col-md-6">
        <h5 className="mb-3">Shipping Information</h5>
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" name="sameAsBilling" id="sameAsBilling" checked={form.sameAsBilling} onChange={e => setForm(f => ({...f, sameAsBilling: e.target.checked,
            shippingFirst: e.target.checked ? f.billingFirst : '',
            shippingLast: e.target.checked ? f.billingLast : '',
            shippingAddress: e.target.checked ? f.billingAddress : '',
            shippingCity: e.target.checked ? f.billingCity : '',
            shippingState: e.target.checked ? f.billingState : '',
            shippingZip: e.target.checked ? f.billingZip : ''
          }))} />
          <label className="form-check-label" htmlFor="sameAsBilling">Shipping same as billing</label>
        </div>
        <input className="form-control mb-2" name="shippingFirst" placeholder="First Name" value={form.shippingFirst} onChange={e => setForm(f => ({...f, shippingFirst: e.target.value}))} />
        <input className="form-control mb-2" name="shippingLast" placeholder="Last Name" value={form.shippingLast} onChange={e => setForm(f => ({...f, shippingLast: e.target.value}))} />
        <input className="form-control mb-2" name="shippingAddress" placeholder="Address" value={form.shippingAddress} onChange={e => setForm(f => ({...f, shippingAddress: e.target.value}))} />
        <input className="form-control mb-2" name="shippingCity" placeholder="City" value={form.shippingCity} onChange={e => setForm(f => ({...f, shippingCity: e.target.value}))} />
        <input className="form-control mb-2" name="shippingState" placeholder="State" value={form.shippingState} onChange={e => setForm(f => ({...f, shippingState: e.target.value}))} />
        <input className="form-control mb-2" name="shippingZip" placeholder="ZIP" value={form.shippingZip} onChange={e => setForm(f => ({...f, shippingZip: e.target.value}))} />
      </div>
      {/* Card Info */}
      <div className="col-12">
        <h5 className="mb-3">Payment Information</h5>
        <input className="form-control mb-2" name="cardNumber" placeholder="Card Number" value={form.cardNumber} onChange={e => setForm(f => ({...f, cardNumber: e.target.value}))} />
        <input className="form-control mb-2" name="cardName" placeholder="Name on Card" value={form.cardName} onChange={e => setForm(f => ({...f, cardName: e.target.value}))} />
        <div className="row">
          <div className="col-md-6">
            <input className="form-control mb-2" name="cardExp" placeholder="Expiration (MM/YY)" value={form.cardExp} onChange={e => setForm(f => ({...f, cardExp: e.target.value}))} />
          </div>
          <div className="col-md-6">
            <input className="form-control mb-2" name="cardCvc" placeholder="CVC" value={form.cardCvc} onChange={e => setForm(f => ({...f, cardCvc: e.target.value}))} />
          </div>
        </div>
      </div>
      <div className="col-12 text-end">
        <button className="btn btn-success btn-lg px-5" type="submit">Checkout</button>
      </div>
    </form>
  );
}

export default Checkout;
