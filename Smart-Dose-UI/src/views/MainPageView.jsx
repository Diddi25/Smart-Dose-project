import "../css/navigationbar.css";

function MainPageView(props) {
    return (
        <div>
            <div className="mainPagePositioning">
                <br />
                <br />
                <button>dispenser status</button>
            </div>
            <div>
                <p>Input weight</p>
                <input type="text" />
            </div>
            <div>
                <p>Select detergent type</p>
                <select name="" id=""></select>
            </div>
            <div>
                <p>Select water hardness</p>
                <select name="" id=""></select>
            </div>
            <div>
                <br />
                <button>start</button>
                <br />
                <button disabled="true">stop</button>
            </div>
        </div>
    );

}

export default MainPageView;