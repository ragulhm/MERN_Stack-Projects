
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { fetchProducts } from '../services/api';
import type { Product } from '../types';
import { CATEGORIES } from '../constants';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(50000);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const filteredAndSortedProducts = products
    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => category === 'All' || p.category === category)
    .filter(p => p.price <= priceRange)
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <div>
      <section className="bg-primary-light text-white p-8 rounded-lg mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Find Your Next Great Buy</h1>
        <p className="text-lg mb-4">Browse millions of ads from your local community</p>
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for cars, furniture, and more..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 rounded-md text-gray-800 focus:outline-none focus:ring-4 focus:ring-accent"
          />
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h3 className="text-xl font-bold mb-4 text-primary">Filters</h3>
            
            {/* Category Filter */}
            <div className="mb-6">
              <label className="font-semibold block mb-2">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
              >
                <option>All</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="font-semibold block mb-2">Max Price: ${priceRange.toLocaleString()}</label>
              <input 
                type="range" 
                min="0" 
                max="50000" 
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
              />
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">{filteredAndSortedProducts.length} results</p>
                <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                >
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
