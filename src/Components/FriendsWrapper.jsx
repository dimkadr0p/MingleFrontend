import PhotoUser from "./PhotoUser";
import StatusUser from "./StatusUser";


function FriendsWrapper({ friend }) {

    return (
        <div className="flex justify-between items-start mb-4">
            <PhotoUser photo={friend.photo} size={50} />
            <p>{friend.name}</p>
            <StatusUser isOnline={friend.online} />
        </div>
    );

}


export default FriendsWrapper;