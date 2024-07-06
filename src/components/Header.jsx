import {Link} from "react-router-dom";

export default function Header (){
    return (
        <div className="header">            
            <h1>Which Elemental Cat Are You? </h1>
            <p>(based on complete random things)</p>

            <div className="link-wrapper">
                <Link to="/" id="link-home">Home</Link>
                <Link to="/quiz" id="link-quiz">Quiz</Link>
            </div>
        </div>
    )
}