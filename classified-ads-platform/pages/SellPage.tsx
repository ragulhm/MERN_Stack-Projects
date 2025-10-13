
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CATEGORIES } from '../constants';

const SellPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  // In a real app, you would fetch existing product data if `isEditing` is true.

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(prev => [...prev, ...files]);
      
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit the form data to the backend
    console.log({ title, description, price, category, location, images });
    alert(isEditing ? 'Ad updated successfully!' : 'Ad posted successfully!');
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-primary mb-6 border-b pb-4">
        {isEditing ? 'Edit Your Ad' : 'Post a New Ad'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Ad Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded-md focus:ring-primary-light focus:border-primary-light" required />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 border rounded-md focus:ring-primary-light focus:border-primary-light" required>
            <option value="">Select a Category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} className="w-full p-3 border rounded-md focus:ring-primary-light focus:border-primary-light" required />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-3 border rounded-md focus:ring-primary-light focus:border-primary-light" required />
            </div>
             <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-3 border rounded-md focus:ring-primary-light focus:border-primary-light" required />
            </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photos</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-light focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-light">
                  <span>Upload files</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleImageChange} accept="image/*" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {imagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {imagePreviews.map((src, index) => (
                <img key={index} src={src} alt="preview" className="w-24 h-24 object-cover rounded-md" />
              ))}
            </div>
          )}
        </div>
        
        <div className="text-right">
          <button type="submit" className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-light transition-colors text-lg">
            {isEditing ? 'Update Ad' : 'Post Ad'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellPage;
