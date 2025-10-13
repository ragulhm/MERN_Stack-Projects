
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };
  
  return (
    <Link to={`/product/${product.id}`} className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        <button onClick={toggleFavorite} className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-red-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </button>
        {product.isSold && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SOLD</div>
        )}
      </div>
      <div className="p-4">
        <p className="text-lg font-bold text-primary truncate">${product.price.toLocaleString()}</p>
        <h3 className="text-gray-800 font-semibold mt-1 truncate group-hover:text-primary-light transition-colors">{product.title}</h3>
        <p className="text-sm text-gray-500 mt-2 truncate">{product.location}</p>
        <p className="text-xs text-gray-400 mt-2">{new Date(product.postedDate).toLocaleDateString()}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
