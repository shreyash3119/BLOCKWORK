import React, { useState } from 'react';

interface ImageUploadProps {
  onImageUpload: (imageNum: number, file: File) => void;
  onStartComparison: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, onStartComparison }) => {
  const [selected, setSelected] = useState({ image1: false, image2: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, num: number) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelected((prev) => ({ ...prev, [`image${num}`]: true }));
      onImageUpload(num, file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleChange(e, 1)}
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleChange(e, 2)}
          className="file-input file-input-bordered w-full max-w-xs"
        />
      </div>
      <button
        onClick={onStartComparison}
        disabled={!selected.image1 || !selected.image2}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        Upload and Compare
      </button>
    </div>
  );
};

export default ImageUpload;
