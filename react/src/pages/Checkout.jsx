import { useState } from 'react';

function Checkout() {
  const [form, setForm] = useState({
    billingFirst: '', billingLast: '', billingAddress: '', billingCity: '', billingState: '', billingZip: '',
    shippingFirst: '', shippingLast: '', shippingAddress: '', shippingCity: '', shippingState: '', shippingZip: '',
    sameAsBilling: false,
    cardNumber: '', cardName: '', cardExp: '', cardCvc: ''
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'sameAsBilling' && checked ? {
        shippingFirst: f.billingFirst,
        shippingLast: f.billingLast,
        shippingAddress: f.billingAddress,
        shippingCity: f.billingCity,
        shippingState: f.billingState,
        shippingZip: f.billingZip
      } : {})
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const required = [
      'billingFirst','billingLast','billingAddress','billingCity','billingState','billingZip',
      'shippingFirst','shippingLast','shippingAddress','shippingCity','shippingState','shippingZip',
      'cardNumber','cardName','cardExp','cardCvc'
    ];
    for (let key of required) if (!form[key]) return alert('Please fill all fields.');
    setSubmitted(true);
  }

  if (submitted) return (
    <div className="text-center p-5">
      <h2 className="fw-bold mb-3">Thank you for your order!</h2>
      <p>Your checkout was successful.</p>
    </div>
  );

  return (
    <form className="row g-4" onSubmit={handleSubmit} autoComplete="off">
      <h2 className="fw-bold mb-4">Checkout</h2>
      {/* Billing Info */}
      <div className="col-12 col-md-6">
        <h5 className="mb-3">Billing Information</h5>
        <input className="form-control mb-2" name="billingFirst" placeholder="First Name" value={form.billingFirst} onChange={handleChange} />
        <input className="form-control mb-2" name="billingLast" placeholder="Last Name" value={form.billingLast} onChange={handleChange} />
        <input className="form-control mb-2" name="billingAddress" placeholder="Address" value={form.billingAddress} onChange={handleChange} />
        <input className="form-control mb-2" name="billingCity" placeholder="City" value={form.billingCity} onChange={handleChange} />
        <input className="form-control mb-2" name="billingState" placeholder="State" value={form.billingState} onChange={handleChange} />
        <input className="form-control mb-2" name="billingZip" placeholder="ZIP" value={form.billingZip} onChange={handleChange} />
      </div>
      {/* Shipping Info */}
      <div className="col-12 col-md-6">
        <h5 className="mb-3">Shipping Information</h5>
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" name="sameAsBilling" id="sameAsBilling" checked={form.sameAsBilling} onChange={handleChange} />
          <label className="form-check-label" htmlFor="sameAsBilling">Shipping same as billing</label>
        </div>
        <input className="form-control mb-2" name="shippingFirst" placeholder="First Name" value={form.shippingFirst} onChange={handleChange} />
        <input className="form-control mb-2" name="shippingLast" placeholder="Last Name" value={form.shippingLast} onChange={handleChange} />
        <input className="form-control mb-2" name="shippingAddress" placeholder="Address" value={form.shippingAddress} onChange={handleChange} />
        <input className="form-control mb-2" name="shippingCity" placeholder="City" value={form.shippingCity} onChange={handleChange} />
        <input className="form-control mb-2" name="shippingState" placeholder="State" value={form.shippingState} onChange={handleChange} />
        <input className="form-control mb-2" name="shippingZip" placeholder="ZIP" value={form.shippingZip} onChange={handleChange} />
      </div>
      {/* Card Info */}
      <div className="col-12">
        <h5 className="mb-3">Payment Information</h5>
        <input className="form-control mb-2" name="cardNumber" placeholder="Card Number" value={form.cardNumber} onChange={handleChange} />
        <input className="form-control mb-2" name="cardName" placeholder="Name on Card" value={form.cardName} onChange={handleChange} />
        <div className="row">
          <div className="col-md-6">
            <input className="form-control mb-2" name="cardExp" placeholder="Expiration (MM/YY)" value={form.cardExp} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <input className="form-control mb-2" name="cardCvc" placeholder="CVC" value={form.cardCvc} onChange={handleChange} />
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
