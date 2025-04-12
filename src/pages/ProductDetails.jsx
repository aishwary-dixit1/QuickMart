import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      toast.error('Failed to fetch product');
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      cart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Added to cart');
  };

  if (!product) return <p className="loading-text">Loading product...</p>;

  return (
    <div className="product-details-container">
      <img src={product.image} alt={product.title} className="product-details-img" />

      <div className="product-details-info">
        <h2>{product.title}</h2>
        <p className="details-price">${product.price}</p>
        <p className="details-desc">{product.description}</p>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart />  Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
