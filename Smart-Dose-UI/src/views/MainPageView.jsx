import "../css/navigationbar.css";

function MainPageView(props) {
    return (
        <div>
            <div>
                <br />
                <br />
                <p>Select weight</p>
                <button>0-3 kg</button>
                <button>4-5 kg</button>
            </div>
            <div>
                <br />
                <p>Select detergent type</p>
                <button>WHITE</button>
                <button>COLOR</button>
            </div>
            <div>
                <br />
                <p>Select water hardness</p>
                <select name="" id=""></select>
            </div>
            <div>
                <br />
                <button>start</button>
                <br />
                <button disabled="true">cancel</button>
            </div>
            <div>
                <br />
                <button>dispenser status</button>
            </div>
        </div>
    );

}

export default MainPageView;