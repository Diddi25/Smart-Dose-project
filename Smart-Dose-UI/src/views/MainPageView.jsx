import "../css/navigationbar.css";
import "../css/mainpage.css";

function MainPageView(props) {
    return (
        <div>
            <div className="header">
                <h1>SMART DOSE</h1>
            </div>
            <div className="background">
                <br />
                <p>SELECT DETERGENT TYPE</p>
                <button>WHITE</button>
                <button>COLOR</button>
                <br />
            </div>
            <div className="background-water">
                <br />
                <p>SELECT WATER HARDNESS</p>
                <button>HARD</button>
                <button>MEDIUM</button>
                <button>SOFT</button>
            </div>
            <div className="city-dropdown">
            <select>
                <option>Choose a city...</option>
                <option>Stockholm 4-6° dH</option>
                <option>Malmö 5.9° dH</option>
                <option>Göteborg 2.7-3.3° dH</option>
            </select>
            </div>
            <div className="background-weight">
                <br />
                <br />
                <p>SELECT WEIGHT</p>
                <button>0-3 kg</button>
                <button>4-5 kg</button>
                <button>6+ kg</button>
                <p>OR use scaling device</p>
                <button>SCALE</button>
            </div>
            <div className="text">
            <br />
            <br />
                <p>START THE DISPENSER</p>
            </div>
            <div class="button-container">
                <br />
                <button>START</button>
                <button>CANCEL</button>
                <br />
            </div>
            <footer>
                Software licences @ [footer]
            </footer>
        </div>
    );

}

export default MainPageView;