"use client";
import { useRef } from "react";
import { Trash2, Paperclip } from "lucide-react";

export default function ResumeFileCard({
  fileName,
  fileSize,
  updatedDate,
  onReplace,
  onDelete,
}) {
  const fileInputRef = useRef(null);

  const handleReplaceClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) onReplace(newFile); // send file back to parent
  };

  return (
    <div className="w-full max-w-lg border rounded-xl p-4 bg-white shadow-sm flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center gap-3 flex-1">
        <Paperclip size={18} className="text-gray-600" />

        <div className="flex flex-col">
          <span className="text-gray-900 font-medium">{fileName}</span>

          <span className="text-xs text-gray-500">
            Size: {fileSize} KB | Last Updated: {updatedDate}
          </span>
        </div>
      </div>

      {/* Replace */}
      <button
        onClick={handleReplaceClick}
        className="text-blue-600 hover:underline text-sm mr-3"
      >
        Replace
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Delete */}
      <button
        onClick={onDelete}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <Trash2 size={18} className="text-gray-600" />
      </button>
    </div>
  );
}
