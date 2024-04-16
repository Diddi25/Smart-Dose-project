import "../css/navigationbar.css";

function NavigationBarView(props) {
    return (
        <div>
            <ul>
                <lis>Home </lis>
                <lis> Instructions </lis>
                <lis> Functionlities </lis>
                <lis> About </lis>
                <lis><button>Login </button></lis>
            </ul>
        </div>
    );

}

export default NavigationBarView;