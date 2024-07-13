//ResumeUpload.js
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import { PDFJSWorker } from 'pdfjs-dist/build/pdf.worker.entry';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as pdfjsLib from 'pdfjs-dist/build/pdf';


// Set workerSrc for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

const DropzoneArea = styled.div`
  border: 2px dashed ${props => props.theme.secondaryColor};
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
  transition: border 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.primaryTextColor};

  &:hover {
    border-color: ${props => props.theme.accentColor};
    box-shadow: 0 0 10px ${props => props.theme.accentColor};
  }
`;

function ResumeUpload({ setCourseRecommendations }) {
  const [fileName, setFileName] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    
    setFileName(file.name);
    setUploading(true);
    try {
      const newRecommendations = await uploadResume(file);
      
      setUploading(false);
      setUploadSuccess(true);
      setCourseRecommendations(newRecommendations);
      console.log('CourseRecommendations state in ResumeUpload after setCourseRecommendations:', newRecommendations);
    } catch (error) {
      console.error('Error in onDrop:', error);
    }
  };

  const uploadResume = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const arrayBuffer = event.target.result;
          const typedArray = new Uint8Array(arrayBuffer);
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          let text = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ');
          }
  
          console.log(`Sending prompt: "${text}"`);
  
          // Send the resume text to your server
          console.log('About to send POST request to server...');
          const response = await axios.post('http://localhost:3000/courses', {
            resumeText: text 
            
          });
          console.log('POST request sent, response received.');
          console.log('Server response:', response.data); // Log the server response

         // Parse the server response into an array of recommendation objects
         if (response.status === 200) {
          const parsedRecommendations = response.data.map((recommendation, index) => {
            return { id: index, text: recommendation };
          });

          setCourseRecommendations(parsedRecommendations);
          navigate('/recommendations');
          resolve(parsedRecommendations);
        } else {
          throw new Error(response.data.message || 'Error getting recommendations');
        }
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
          <DropzoneArea {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop your resume here, or click to select a file</p>
              {fileName && <p>Selected file: {fileName}</p>}
          </DropzoneArea>
        )}
      </Dropzone>
      {uploading && <p>Uploading...</p>}
      {uploadSuccess && <p>File uploaded successfully!</p>}
    </div>
  );
}

export default ResumeUpload;
