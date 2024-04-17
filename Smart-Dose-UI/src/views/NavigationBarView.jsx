import "../css/navigationbar.css";

function NavigationBarView(props) {
    return (
        <div>
            <a href="" className="navItems">Home</a>
            <a href="" className="navItems">About us</a>
            <a href="" className="navItems">Instructions</a>
            <a href="" className="loginButton"><button>Login</button></a>
        </div>
    );

}

export default NavigationBarView;