//ResumeUpload.js
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import CourseRecommendations from './CourseRecommendations';
import { getDocument } from 'pdfjs-dist/build/pdf';
import { PDFJSWorker } from 'pdfjs-dist/build/pdf.worker.entry';
import { type } from '@testing-library/user-event/dist/type';


function ResumeUpload({ recommendations, setCourseRecommendations, handleSelectRecommendation }) {
  const [fileName, setFileName] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    setUploading(true);
    const newRecommendations = await uploadResume(file);
    setCourseRecommendations(newRecommendations); // Set the course recommendations
    setUploading(false);
    setUploadSuccess(true);
  };

  const uploadResume = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const arrayBuffer = event.target.result;
          const typedArray = new Uint8Array(arrayBuffer);
          const pdf = await getDocument({ data: typedArray }).promise;
          let text = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ');
          }
  
          console.log(`Sending prompt: "${text}"`);
  
          // Send the resume text to your server
          console.log('About to send POST request to server...');
          const response = await axios.post('http://localhost:3001/getCourseRecommendations', {
            resumeText: text
          });
          console.log('POST request sent, response received.');
  
          // Return the course recommendations from the server response
          resolve(response.data);
        } catch (error) {
          console.error('Error uploading resume:', error);
          reject(error);
        }
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
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
      {recommendations && <CourseRecommendations recommendations={CourseRecommendations} onSelect={handleSelectRecommendation} />}
    </div>
  );
}

export default ResumeUpload;
