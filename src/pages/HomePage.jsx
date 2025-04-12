import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data);
      setFilteredData(res.data);
    } catch (err) {
      toast.error('Failed to fetch products');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/products/categories');
      setCategories(['all', ...res.data]);
    } catch (err) {
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    let data = [...products];

    if (selectedCategory !== 'all') {
      data = data.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      data = data.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (sortOrder === 'low-to-high') {
      data.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
      data.sort((a, b) => b.price - a.price);
    }

    setFilteredData(data);
  }, [searchQuery, selectedCategory, products, sortOrder]);

  return (
    <div className='homepage-main'>
      <div className='welcome-screen'>
        <p>Your One-Stop Trend Hub</p>
      </div>
    <div className="homepage-container">
      <div className="filter-bar">
        <input className='search-bar'
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
        value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat.toUpperCase()}</option>
          ))}
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredData.length > 0 ? (
          filteredData.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default HomePage;
