import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
    return (
        <footer className="footer-wrapper">
            <p><Link to="https://github.com/Skanarky" target="_blank" className="noLine">Ilian</Link>| <Link to="https://github.com/AnikThomas" target="_blank" className="noLine">Anik</Link> | <Link to="https://github.com/mshiloh" target="_blank" className="noLine">Morgan</Link> | <Link to="https://github.com/mshiloh/set-for-set" target="_blank" className="noLine">The Melting Pot Team © 2018</Link></p>
            <p className="copyright">Copyright © 1998, 1991 Cannei, LLC. All rights reserved. SET® and all designated logos and slogans are registered trademarks of Cannei, LLC. </p>
        </footer>
    )
}

export default Footer;