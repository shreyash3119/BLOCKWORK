import React, { useState } from 'react';
import axios from 'axios';

const PostJob: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    tags: '',
    clientId: localStorage.getItem('userId') // or pass as prop
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = formData.tags.split(',').map(tag => tag.trim());
    await axios.post('http://localhost:5000/api/jobs', { ...formData, tags });
    alert("Job posted!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" onChange={handleChange} placeholder="Job Title" className="w-full p-2 border" required />
        <textarea name="description" onChange={handleChange} placeholder="Description" className="w-full p-2 border" />
        <input name="price" onChange={handleChange} placeholder="Price (₹)" className="w-full p-2 border" />
        <input name="tags" onChange={handleChange} placeholder="Tags (comma separated)" className="w-full p-2 border" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Post</button>
      </form>
    </div>
  );
};

export default PostJob;
