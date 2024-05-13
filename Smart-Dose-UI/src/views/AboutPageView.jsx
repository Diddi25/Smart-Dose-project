import "../css/AboutPage.css";
import logo from '../images/logo3.png';
function AboutPageView(props) {
    return (

        <div className="profile-container">
            <div>
                <title>
                    About us 
                </title>
            </div>
            <div>
            <div className="header-about">
                <h1>SMART DOSE</h1>
                </div>
                <img src={logo} alt="logo" className="logo-image"></img>
            <div>
             <div className="card-container">
            <div className="creators">
            <div className="creators-text">
                <h2> The Creators</h2>
                <p>  Meet the brains behind Smart Dose: a game-changer developed by six KTH engineering students. 
                    Tackling the issue of detergent overuse head-on, we brainstormed a smarter approach. 
                    With combined skills and determination, we created Smart Dose to simplify laundry while cutting waste. 
                    Our work reflects a commitment to sustainability and a love for solving problems, paving the way for a cleaner world.
                </p>
            </div>
            </div>
            <div className="about">
            <div className="creators-text">
                <h2> The story about Smart Dose</h2>
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                </p>
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>
    );
}

export default AboutPageView;
