import React from "react";
import Kitten from "../images/kitten.jpeg"

function Footer() {
    return (
        <footer>
            <img src={Kitten} alt="" />
            <span> Made with ♡ and <b> React.js</b>.</span>
        </footer>
    )
}

export default Footer
