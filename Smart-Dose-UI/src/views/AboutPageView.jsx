import "../css/AboutPage.css";
import logo5 from '../images/logo5.png';
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
                <img src={logo5} alt="logo5" className="logo-image"></img>
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
                <p>  Imagine a world where laundry day is a breeze, where you never have to second-guess how much detergent to use. 
                    That's the promise of Smart Dose. Smart Dose isn't just another laundry accessory – it's a game-changer. With its built-in scale, 
                    this ingenious device takes the stress out of laundry by accurately measuring your load. Just pick your detergent type, and Smart Dose handles the rest, 
                    dispensing the perfect amount every time. No more wasted detergent. No more worrying about whether your clothes are getting clean enough. 
                    Smart Dose gives you the confidence that your laundry will come out fresh and spotless, without the guesswork. Experience the freedom and ease of Smart Dose – 
                    join the revolution in laundry care today.
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
