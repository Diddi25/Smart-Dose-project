import "../css/instructionpage.css";

function InstructionPageView(props) {
    function renderHardnessDataACB() {
        props.hardnessData.forEach(node => {
            if (node) { // Check if the array element is not empty
                console.log(`Local Number: ${node.local_nr}, Local Name: ${node.local_name}, Hardness: ${node.hardness}`);
            }
        });
    }
    return (
        <div>
            <div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <div>
                <button onClick={renderHardnessDataACB}>Click to verify hardness data in console</button>
            </div>
        </div>
    );
}

export default InstructionPageView;
