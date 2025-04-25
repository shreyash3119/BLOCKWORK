import React, { useState } from 'react';
import ImageUpload from '../../components/ImageUpload';

const ImageComparator: React.FC = () => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image1Preview, setImage1Preview] = useState<string | null>(null);
  const [image2Preview, setImage2Preview] = useState<string | null>(null);
  const [similarity, setSimilarity] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (num: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (num === 1) {
        setImage1(file);
        setImage1Preview(reader.result as string);
      } else {
        setImage2(file);
        setImage2Preview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const compareImages = () => {
    if (!image1 || !image2 || !image1Preview || !image2Preview) return;

    setLoading(true);
    const img1 = new Image();
    const img2 = new Image();

    img1.onload = () => {
      img2.onload = () => {
        compareImagesWithCanvas(img1, img2);
      };
      img2.src = image2Preview;
    };
    img1.src = image1Preview;
  };

  const compareImagesWithCanvas = (img1: HTMLImageElement, img2: HTMLImageElement) => {
    const width = Math.max(img1.width, img2.width);
    const height = Math.max(img1.height, img2.height);

    const canvas1 = document.createElement('canvas');
    const canvas2 = document.createElement('canvas');
    canvas1.width = width;
    canvas1.height = height;
    canvas2.width = width;
    canvas2.height = height;

    const ctx1 = canvas1.getContext('2d')!;
    const ctx2 = canvas2.getContext('2d')!;
    ctx1.drawImage(img1, 0, 0, width, height);
    ctx2.drawImage(img2, 0, 0, width, height);

    const data1 = ctx1.getImageData(0, 0, width, height).data;
    const data2 = ctx2.getImageData(0, 0, width, height).data;

    let diffPixels = 0;
    const totalPixels = data1.length / 4;
    const threshold = 30;

    for (let i = 0; i < data1.length; i += 4) {
      const rDiff = Math.abs(data1[i] - data2[i]);
      const gDiff = Math.abs(data1[i + 1] - data2[i + 1]);
      const bDiff = Math.abs(data1[i + 2] - data2[i + 2]);
      const aDiff = Math.abs(data1[i + 3] - data2[i + 3]);

      if (rDiff > threshold || gDiff > threshold || bDiff > threshold || aDiff > threshold) {
        diffPixels++;
      }
    }

    const percentage = (100 - (diffPixels / totalPixels) * 100).toFixed(2);
    setSimilarity(percentage);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🧠 Image Similarity Comparator
      </h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 mb-6">
        <ImageUpload onImageUpload={handleImageUpload} onStartComparison={compareImages} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {image1Preview && (
          <div className="bg-gray-50 border rounded-lg p-4 shadow hover:shadow-md transition">
            <h3 className="text-center text-sm text-gray-600 mb-2">Image 1</h3>
            <img
              src={image1Preview}
              alt="Image 1 Preview"
              className="w-full h-60 object-contain rounded"
            />
          </div>
        )}
        {image2Preview && (
          <div className="bg-gray-50 border rounded-lg p-4 shadow hover:shadow-md transition">
            <h3 className="text-center text-sm text-gray-600 mb-2">Image 2</h3>
            <img
              src={image2Preview}
              alt="Image 2 Preview"
              className="w-full h-60 object-contain rounded"
            />
          </div>
        )}
      </div>

      {loading && (
        <div className="text-center text-blue-500 font-medium">
          <svg className="animate-spin h-6 w-6 mx-auto mb-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          Comparing images...
        </div>
      )}

      {similarity && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Similarity Score</h2>
          <div className="w-full bg-gray-300 rounded h-6 mt-3 overflow-hidden">
            <div
              className="bg-green-500 h-6 text-white text-sm font-semibold flex items-center justify-center transition-all duration-700"
              style={{ width: `${similarity}%` }}
            >
              {similarity}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageComparator;
