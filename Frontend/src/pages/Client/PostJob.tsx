import React, { useState } from 'react';
import axios from 'axios';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    tags: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = formData.tags.split(',').map(tag => tag.trim());
    const clientId = localStorage.getItem('userId'); // ✅ get clientId

    try {
      await axios.post('http://localhost:5001/api/jobs/post', {
        ...formData,
        tags,
        clientId, // ✅ send clientId to backend
      });

      alert('Job posted!');
      setFormData({
        title: '',
        description: '',
        price: '',
        tags: '',
      });
    } catch (err) {
      console.error('Error posting job:', err);
      alert('Job posting failed!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 font-medium">Budget (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
