import "../css/AboutPage.css";

function AboutPageView(props) {
    return (
        <div className="about-container">
            <div className="about-section">
                <h1>About Us</h1>
                <p>Vi är ett team av passionerade utvecklare som älskar att skapa fantastiska webbapplikationer.</p>
            </div>
            <div className="team-section">
                <h2>Vårt team</h2>
                <p>Här kan du lägga till information om ditt team.</p>
            </div>
            <div className="mission-section">
                <h2>Vår mission</h2>
                <p>Här kan du beskriva företagets mission.</p>
            </div>
        </div>
    );
}

export default AboutPageView;
