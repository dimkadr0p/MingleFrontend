import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function PhotoUploader({ onPhotoUpload }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);
  };

  const handleUpload = () => {
    onPhotoUpload(selectedPhoto);
    setSelectedPhoto(null);
  };

  return (
    <div>
      <input type="file" onChange={handlePhotoChange} />
      <Button variant="outline-info" className='mb-3 mt-1'  onClick={handleUpload}>Загрузить фото</Button>{' '}
    </div>
  );
}

export default PhotoUploader;



