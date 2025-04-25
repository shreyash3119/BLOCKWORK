import React, { useState, ChangeEvent, FormEvent } from 'react';

const RequirementAnalyzer: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setResult(null);
    }
  };

  const handleRequirementChange = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const addRequirement = () => setRequirements([...requirements, '']);
  const removeRequirement = (index: number) => {
    const updated = [...requirements];
    updated.splice(index, 1);
    setRequirements(updated);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!image) return setError('🚫 Please upload an image');
    const filtered = requirements.filter(req => req.trim() !== '');
    if (filtered.length === 0) return setError('🚫 Add at least one requirement');

    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('requirements', JSON.stringify(filtered));

    try {
      const res = await fetch('http://localhost:5002/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Unknown error');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">📋 AI Requirement Analyzer</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-6 border"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Image Upload */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-3 w-40 h-40 object-cover border rounded"
            />
          )}
        </div>

        {/* Requirement Inputs */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Requirements</label>
          {requirements.map((req, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={req}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                placeholder="e.g., Green leaves, No brown spots..."
                className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                disabled={requirements.length <= 1}
                className="px-3 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRequirement}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            ➕ Add Requirement
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
        >
          {loading ? 'Analyzing...' : 'Analyze Image'}
        </button>
      </form>

      {/* Loading Indicator */}
      {loading && (
        <div className="mt-4 text-center text-blue-500 font-medium animate-pulse">
          🔍 Analyzing image with Gemini AI...
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">✅ Analysis Results</h2>
          <div className="text-sm space-y-1">
            <p><strong>Matched:</strong> <span className="text-green-600">{result.percentage}%</span> of requirements</p>
            <p><strong>Total Requirements:</strong> {result.total}</p>
            <p><strong>Present:</strong> {result.present}</p>
            <p><strong>Not Present:</strong> {result.notPresent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequirementAnalyzer;
