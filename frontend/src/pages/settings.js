import { Link } from "react-router-dom";
import "../cssStyles/settings.css";

function Settings() {
    return (
       <div>
        <header>
            <h1>Settings</h1>
        </header>
        <div className="settings-nav">
            <nav>
                <Link to="/profileSettings.js">Profile Info</Link>
                <Link to="/privacySettings.js">Privacy</Link>
                <Link to="/notifSettings.js">Notifications</Link>
            </nav>
        </div>
        <div className="edit-profile">
            <h2>Edit Profile</h2>
            <form id="edit-profile-form">
                <label htmlFor="new-profile-pic">Profile Picture</label>
                <input type="file" id="new-profile-pic" accept="image/*"/>

                <label htmlFor="new-username">Username</label>
                <input type="text" id="new-username" placeholder="Enter new username"/>

                <label htmlFor="new-bio">Bio</label>
                <textarea id="new-bio" rows="3" placeholder="Enter new bio"></textarea>

                <button type="submit">Update</button>
            </form>
        </div>
       </div> 
    )
}

export default Settings;