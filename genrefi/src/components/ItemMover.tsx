import { useContext, useState } from "react";
import { NavigatorContext } from "./Navigator";
import { getFolderByName, updateFolder } from "../api/folder";

function ItemMover() {
    const [movingSomething, setMovingSomething] = useState(false);
    const [itemBeingMoved, setItemBeingMoved] = useState('');
    const [itemBeingMovedParent, setItemBeingMovedParent] = useState('');
    const { folders, fetchAndRenderCurrentFolder, goBack } = useContext(NavigatorContext);

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
        // Remove from old parent
        let parent = await getFolderByName(itemBeingMovedParent);
        let updatedContents = parent.contents.filter((item: string) => item !== itemBeingMoved);
        updateFolder(itemBeingMovedParent, {name: itemBeingMovedParent, contents: updatedContents});
        // Add to new parent
        const newParentName = folders[folders.length - 1];
        parent = await getFolderByName(newParentName);
        updatedContents = [...parent.contents, itemBeingMoved];
        await updateFolder(newParentName, {name: newParentName, contents: updatedContents});
        
        fetchAndRenderCurrentFolder();
        setMovingSomething(false);
    }

    const remove = async () => {
        // Remove from old parent
        const parent = await getFolderByName(itemBeingMovedParent);
        const updatedContents = parent.contents.filter((item: string) => item !== itemBeingMoved);
        await updateFolder(itemBeingMovedParent, {name: itemBeingMovedParent, contents: updatedContents});
        goBack();
        setMovingSomething(false);
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
