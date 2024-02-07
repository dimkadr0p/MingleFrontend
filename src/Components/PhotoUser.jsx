import React from "react";



function PhotoUser({ photo, size }) {

    return (
        <div>
            {photo ? (
                <div>
                    <img
                    src={photo}
                        alt="Фото пользователя"
                        className="rounded-circle"
                        style={{ width: `${size}px`, height:`${size}px` }}
                    />
                </div>
            ) : (
                <div
                    className="rounded-circle"
                    style={{
                        width: `${size}px`, 
                        height: `${size}px`,
                        backgroundColor: 'lightgray',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <span style={{ color: 'white', fontSize: '24px' }}>👤</span>
                </div>
            )}

        </div>
    );


}



export default PhotoUser;