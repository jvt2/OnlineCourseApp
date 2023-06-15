import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

function ResumeUpload() {
  const [resumeData, setResumeData] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const data = await parseResume(file);
    setResumeData(data);
  };

  const parseResume = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('https://api.sovren.com/parse-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Include any other headers required by the API
      },
    });

    return response.data;
  };

  return (
    <div>
      <Dropzone onDrop={onDrop}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop your resume here, or click to select a file</p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export default ResumeUpload;
