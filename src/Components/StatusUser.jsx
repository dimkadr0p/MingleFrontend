import React from "react";



function StatusUser({ isOnline }) {
    return (
        <div className="isOnline mb-3">
            {isOnline ? <div className="online text-green-500">Онлайн</div> : <div className="offline text-gray-400">Оффлайн</div>}
        </div>
    );
}


export default StatusUser;