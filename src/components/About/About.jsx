import { Link } from "react-router-dom";
import baseAPI from "../../../baseAPI";

function About() {
    return (
        <div className="about">
            I depend on API from Tarmeez Academy API to query all data.
            <Link to={baseAPI} target="_blank" rel="noopener noreferrer">
                API Link
            </Link>
        </div>
    );
}

export default About;
