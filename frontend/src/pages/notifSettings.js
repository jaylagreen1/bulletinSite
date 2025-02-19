import { Link } from "react-router-dom";
import "../cssStyles/settings.css";

function privacySettings() {
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
        </div>
    )
}