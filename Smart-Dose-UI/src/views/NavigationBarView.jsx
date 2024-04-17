import "../css/navigationbar.css";

function NavigationBarView(props) {
    return (
        <div>
            <ul className="navItems">
                <lis>Home </lis>
                <lis> Instructions </lis>
                <lis> Functionlities </lis>
                <lis> About </lis>
            </ul>
            <ul className="loginButton">
                <lis><button>Login</button></lis>
            </ul>
        </div>
    );

}

export default NavigationBarView;