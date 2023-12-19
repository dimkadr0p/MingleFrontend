import React from "react";



function PhotoUser({ photo, size }) {

    const [photoUrl, setPhotoUrl] = React.useState(null);

    React.useEffect(() => {
        if (photo) {
            let file;
            if (typeof photo === 'string') {
                const byteCharacters = atob(photo);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                file = new Blob([byteArray], { type: 'image/jpeg' });
            } else {
                file = photo;
            }

            const reader = new FileReader();
            reader.onload = () => {
                setPhotoUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [photo]);

    return (
        <div>
            {photo ? (
                <div>
                    <img
                        src={photoUrl}
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