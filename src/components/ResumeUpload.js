import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

function ResumeUpload() {
  const [resumeData, setResumeData] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [uploading, setUploading] = useState(false); // <-- Corrected here
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    setUploading(true);
    const data = await uploadResume(file);
    setResumeData(data);
    setUploading(false);
    setUploadSuccess(true);
  };

  const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post('http://localhost:3001/uploadResume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center' }}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop your resume here, or click to select a file</p>
              {fileName && <p>Selected file: {fileName}</p>}
            </div>
          </section>
        )}
      </Dropzone>
      {uploading && <p>Uploading...</p>}
      {uploadSuccess && <p>File uploaded successfully!</p>}
    </div>
  );
}

export default ResumeUpload;
