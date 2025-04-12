import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice.toFixed(2));
  }, [cart]);

  const updateQuantity = (id, amount) => {
    const updated = cart
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return newQty < 1 ? null : { ...item, quantity: newQty };
        }
        return item;
      })
      .filter(Boolean);

    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id) => {
    const filtered = cart.filter((item) => item.id !== id);
    setCart(filtered);
    localStorage.setItem('cart', JSON.stringify(filtered));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Item removed');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is already empty!');
      return;
    }

    localStorage.removeItem('cart');
    setCart([]);
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Order placed successfully!', { duration: 4000 });
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-card">
                <img src={item.image} alt={item.title} />
                <div className="cart-info">
                  <h4>{item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title}</h4>
                  <p>${item.price} x {item.quantity} = <strong>${(item.price * item.quantity).toFixed(2)}</strong></p>
                  <div className="cart-actions">
                    <button className='cart-actions-btn' onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className='cart-actions-btn' onClick={() => updateQuantity(item.id, 1)}>+</button>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}><Trash2 size={14}/> Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p>Total: <strong>${total}</strong></p>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
