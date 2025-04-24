// src/pages/Client/Files.tsx
import React, { useState } from "react";
// import { Button } from "@/components/ui/button"; // adjust path as needed
const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );

const Files: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]); // mock filenames

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setUploadedFiles((prev) => [...prev, selectedFile.name]);
      setSelectedFile(null);
    }
  };

  const handleDownload = (fileName: string) => {
    alert(`Pretending to download ${fileName}`);
    // In real case: window.location.href = `/your-api/download/${fileName}`
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Project Files</h2>

      <div className="mb-6">
        <input type="file" onChange={handleFileChange} />
        <Button onClick={handleUpload} disabled={!selectedFile} className="ml-2">
          Upload
        </Button>
      </div>

      <h3 className="text-xl font-semibold mb-2">Uploaded Files:</h3>
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index} className="mb-1 flex items-center justify-between w-1/2">
            <span>{file}</span>
            <Button onClick={() => handleDownload(file)}>
              Download
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Files;