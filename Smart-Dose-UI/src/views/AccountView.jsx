
import "../css/account.css";

function AccountView(props) {
    return (
        <div>
            <div>
                <title>
                    My Profile
                </title>
            </div>
            <div>
                <h5>Welcome Diddi</h5>
                <p>{/*google account name*/}</p>
            </div>
            <div>
                <h6>
                    Water hardness
                </h6>
                <select value="Stockholm 4-6 dH" id=""></select>    
            </div>
            <div>
                <h6>
                    Recently used detergent types
                </h6>
                <h6>
                    WHITE
                </h6>
                <button>Remove</button>
                <div>
                    {/* Saved white detergent */}
                </div>
                <h6>
                    COLOR
                </h6>
                <button>Remove</button>
                <div>
                    {/* Saved colored detergent */}
                </div>
            </div>
            <div>
                <br />
                <br />
                <br />
                <button>
                    Log out
                </button>
            </div>
            <div>
                <button>
                    Delete account
                </button>
            </div>
        </div>
    );
}

export default AccountView;
