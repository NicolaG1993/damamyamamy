import ProfilePic from "./ProfilePic";

export default function Profile(props) {
    console.log("Profile.js props", props);
    return (
        <div className="profileComp">
            <ProfilePic
                toggleUploader={props.toggleUploader}
                profilePicUrl={props.profilePicUrl}
                size="medium"
            />
            <h1>
                {props.firstName} {props.lastName}
            </h1>
            <button>Modifica profilo</button>
        </div>
    );
}

//add bio and infos editor
//add profile-pic uploader
