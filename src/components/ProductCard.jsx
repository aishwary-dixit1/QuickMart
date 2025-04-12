import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <div className="product-info">
          <h3>{product.title.length > 25 ? product.title.slice(0, 25) + '...' : product.title}</h3>
          <div className='price-add-to-cart'>
            <p className="price">${product.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
