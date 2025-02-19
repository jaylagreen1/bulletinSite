import { Link } from "react-router-dom";
import { useState } from "react";
import "../cssStyles/myProfile.css";
import image from "../images/default-profile-pic.jpg"

function MyProfile() {
    const [username, setUsername] = useState("username");
    const [bio, setBio] = useState("default bio");

    const [followerCount, setFollowerCount] = useState(100);
    const [followingCount, setFollowingCount] = useState(160);
    const [groupCount, setGroupCount] = useState(4);


    return (
        <div>
            <div className="profile-card">
                <img id="profile-pic" src={image} alt="Profile Picture"/>
                <div className="profile-info">
                    <h2>{username}</h2>
                    <p>{bio}</p>
                </div>
                <div className="stats">
                    <div className="stat-item">
                        <h3>Followers</h3>
                        <p id="follower-count">{followerCount}</p>
                    </div>
                    <div class="stat-item">
                        <h3>Following</h3>
                        <p id="folowing-count">{followingCount}</p>
                    </div>
                    <div class="stat-item">
                        <h3>Groups</h3>
                        <p id="group-count">{groupCount}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;