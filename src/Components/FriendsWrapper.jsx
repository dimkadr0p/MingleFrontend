import PhotoUser from "./PhotoUser";
import StatusUser from "./StatusUser";
import Button from 'react-bootstrap/Button';

function FriendsWrapper({ friend, onDelete  }) {

    return (
        <div className="flex justify-between items-start mb-4">
            <PhotoUser photo={friend.photo} size={50} />
            <p>{friend.name}</p>
            <StatusUser isOnline={friend.online} />
            <Button variant="danger" onClick={onDelete}>
                <span>&times;</span>
            </Button>
        </div>
    );

}


export default FriendsWrapper;