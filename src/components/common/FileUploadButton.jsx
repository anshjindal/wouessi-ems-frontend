import { useRef, useState } from "react";
import { Paperclip } from "lucide-react";
import "../../styles/components/FileUploadButton.css"

export default function FileUploadButton({ onFileSelect }) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(""); // State for file name

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name); // Update state with file name
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  return (
    <div className="file-upload-container">
      {/* Upload Button */}
      <button type="button" className="file-upload-button" onClick={handleClick}>
        Attach file <Paperclip size={16} />
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden-input"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg,.png"
      />

      {/* Show file name */}
      {fileName && <span className="file-name">{fileName}</span>}
    </div>
  );
}
