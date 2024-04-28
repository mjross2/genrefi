import { SetStateAction, useContext, useRef, useState } from "react";
import { NavigatorContext } from "./Navigator";

function ContentAdder() {
    const [input, setInput] = useState("");
    const [addingSomething, setAddingSomething] = useState(false);
    const { folders, contents, addItemToContents } = useContext(NavigatorContext);

    const addSomething = () => {
        setAddingSomething(true);
    }

    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInput(e.target.value);
    }

    const handleKeyDown = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            setAddingSomething(false);
            setInput('');
            if (input.trim().length != 0){
                addItemToContents(input);
            }
        }
    };

    return (
    <>
        {(!addingSomething && (
            <button onClick={addSomething}>Add Something</button>
        )) || 
            <div className="card">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    id="addSomethingInput"
                    placeholder="press enter to cancel"
                />
            </div>
        }
    </>
    )
}

export default ContentAdder
