import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { NavigatorContext } from "./Navigator";

function ContentAdder() {
    const [input, setInput] = useState("");
    const [addingSomething, setAddingSomething] = useState(false);
    const { addItemToContents } = useContext(NavigatorContext);
    const inputRef = useRef<HTMLInputElement>(null);

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

    // automatically select textbox
    useEffect(() => {
        if (addingSomething && inputRef.current) {
            inputRef.current.focus();
        }
    }, [addingSomething])

    return (
    <>
        {(!addingSomething && (
            <button onClick={addSomething}>Add Something</button>
        )) || 
            <div className="card">
                <input
                    type="text"
                    ref={inputRef}
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
