import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProductStatus } from '../services/api';
import type { Product } from '../types';
import Spinner from '../components/Spinner';
import PaymentModal from '../components/PaymentModal';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const loadProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      if (data) {
        setProduct(data);
        setMainImage(data.images[0]);
      } else {
        navigate('/404');
      }
      setLoading(false);
    };
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handlePurchaseSuccess = async () => {
    if (!product) return;
    
    setIsPaymentModalOpen(false);
    const updatedProduct = await updateProductStatus(product.id, true);
    
    if (updatedProduct) {
      setProduct(updatedProduct);
    } else {
      alert('An error occurred while finalizing the purchase. Please refresh the page.');
    }
  };

  if (loading || !product) {
    return <Spinner />;
  }
  
  const { title, description, price, images, location, seller, postedDate, category, isSold } = product;

  return (
    <>
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-xl max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="relative">
              <img src={mainImage} alt={title} className="w-full h-96 object-cover rounded-lg shadow-md" />
              {isSold && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white font-bold px-4 py-2 rounded-lg text-lg">SOLD</div>
              )}
            </div>
            <div className="flex space-x-2 mt-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${title} thumbnail ${index + 1}`}
                  onClick={() => setMainImage(img)}
                  className={`w-24 h-24 object-cover rounded-md cursor-pointer border-4 ${mainImage === img ? 'border-primary' : 'border-transparent'} hover:border-primary-light transition-all`}
                />
              ))}
            </div>
          </div>

          {/* Product & Seller Info */}
          <div className="lg:col-span-1 flex flex-col space-y-6">
            {/* Product Details */}
            <div className="border-b pb-6">
              <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">{category}</span>
              <h1 className="text-4xl font-bold text-primary mt-3">{title}</h1>
              <p className="text-4xl font-light text-gray-800 mt-4">${price.toLocaleString()}</p>
              <p className="text-gray-600 mt-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                {location}
              </p>
            </div>
            
            {/* Seller Details */}
            <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-lg font-bold text-primary mb-3">Seller Information</h3>
                <div className="flex items-center space-x-4">
                    <img src={seller.profilePicture} alt={seller.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                        <p className="font-semibold text-lg">{seller.name}</p>
                        <p className="text-sm text-gray-500">Member since {new Date(seller.joinedDate).getFullYear()}</p>
                        <div className={`flex items-center text-sm ${seller.isOnline ? 'text-green-500' : 'text-gray-400'}`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${seller.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                            {seller.isOnline ? 'Online' : 'Offline'}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
                <button 
                  onClick={() => navigate('/messages')} 
                  className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-light transition-colors text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={isSold}
                >
                  Chat with Seller
                </button>
                <button 
                  onClick={() => setIsPaymentModalOpen(true)}
                  disabled={isSold}
                  className="w-full bg-accent text-primary font-bold py-3 rounded-lg hover:opacity-80 transition-opacity text-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  {isSold ? 'Sold Out' : 'Buy Now'}
                </button>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="mt-10 pt-6 border-t">
          <h2 className="text-2xl font-bold text-primary mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed">{description}</p>
          <p className="text-sm text-gray-400 mt-4">Posted on: {new Date(postedDate).toLocaleString()}</p>
        </div>
      </div>
      
      {product && (
        <PaymentModal 
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          product={product}
          onSuccess={handlePurchaseSuccess}
        />
      )}
    </>
  );
};

export default ProductDetailPage;