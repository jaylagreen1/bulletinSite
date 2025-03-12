import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../cssStyles/myProfile.css";
import defaultImage from "../images/default-profile-pic.jpg"

function MyProfile() {
    const [username, setUsername] = useState("username");
    const [bio, setBio] = useState("default bio");
    const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || defaultImage);

    const [followerCount, setFollowerCount] = useState(100);
    const [followingCount, setFollowingCount] = useState(160);
    const [groupCount, setGroupCount] = useState(4);

    useEffect(() => {
        fetch("/api/user")
            .then((res) => res.json())
            .then((data) => {
                setUsername(data.username);
                setBio(data.bio);
                setFollowerCount(data.followers);
                setFollowingCount(data.following);
                setGroupCount(data.groups);
                if (data.profilePic) {
                    setProfilePic(data.profilePic);
                    localStorage.setItem("profilePic", data.profilePic); // Store in localStorage
                }
            })
            .catch((err) => console.error("Error fetching user data:", err));
    }, []);
    

    return (
        <div>
            <div className="profile-card">
                <img id="profile-pic" src={profilePic} alt="Profile Picture"/>
                <div className="profile-info">
                    <h2>{username}</h2>
                    <p>{bio}</p>
                </div>
                <div className="stats">
                    <div className="stat-item">
                        <h3>Followers</h3>
                        <p id="follower-count">{followerCount}</p>
                    </div>
                    <div className="stat-item">
                        <h3>Following</h3>
                        <p id="following-count">{followingCount}</p>
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