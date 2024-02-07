import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import StatusUser from './StatusUser';
import PhotoUser from './PhotoUser';
import PhotoUploader from './PhotoUploader';


function ProfileCenteredModal(props) {

  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    const handleProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get('http://localhost:8080/api/user/info', config);
        if (response.status === 200) {
          setUserData(response.data); // Сохранение данных пользователя в состоянии
        }
      } catch (error) {
        console.log("error ", error);
      }
    };

    handleProfile();
  }, []);


  const handlePhotoUpload = async (photo) => {
    try {
        const formData = new FormData();
        formData.append('file', photo);

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        };

        const response = await axios.post('http://localhost:8080/api/user/upload', formData, config);
        console.log('Фотография успешно загружена:', response.data);
        window.location.reload(); // Перезагрузка страницы после успешной загрузки
    } catch (error) {
        console.log('Ошибка загрузки фотографии:', error);
    }
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Профиль
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userData && (
          <div>
            <PhotoUploader onPhotoUpload={handlePhotoUpload} />
            <PhotoUser photo={userData.photo} size={100}/>
            <StatusUser isOnline={userData.online} />
            <p>
              Логин: {userData.name} <br />
              Email: {userData.email} {/* Пример вывода данных пользователя */}
            </p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileCenteredModal;
