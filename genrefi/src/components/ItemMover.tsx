import { useContext, useState } from "react";
import { NavigatorContext } from "./Navigator";
import { getFolderByName } from "../api/folder";

function ItemMover() {
    const [movingSomething, setMovingSomething] = useState(false);
    const [itemBeingMoved, setItemBeingMoved] = useState('');
    const [itemBeingMovedParent, setItemBeingMovedParent] = useState('');
    const { folders } = useContext(NavigatorContext);

    const enterMovingMode = () => {
        if (folders.length < 2) {
            alert("ROOT cannot be moved!");
            return;
        }
        setItemBeingMoved(folders[folders.length - 1]);
        setItemBeingMovedParent(folders[folders.length - 2]);
        setMovingSomething(true);
    }

    const place = async () => {
        const localFolder = await getFolderByName(itemBeingMovedParent);
        const updated = localFolder.filter(item => item !== itemBeingMoved);
        setMovingSomething(false);
    }

    const remove = () => {
        setMovingSomething(false);
        alert("delete unimplemented")
    }

    return (
    <>
        {(!movingSomething && (
            <button onClick={enterMovingMode} className="grid-item">
                Move folder
            </button>
        )) || ((folders[folders.length - 1] !== itemBeingMoved) &&
            <button onClick={place} className="grid-item">
                Place {itemBeingMoved} here
            </button>
        ) ||
            <button onClick={remove} className="grid-item">
                Delete {itemBeingMoved}
            </button>
        }
    </>
    )
}

export default ItemMover
