import React, { useEffect, useState, useMemo, createContext, ReactNode, useRef } from 'react';
import { IconContext } from "react-icons";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import ContentAdder from './ContentAdder';
import { getFolderByName, updateFolder, createFolder } from '../api/folder';
import ItemMover from './ItemMover';
import { getVideoName } from '../api/youtube';
import YouTubePlayer from './YouTubePlayer';

// Overhead

interface Children {
    children: ReactNode;
}

interface NavigatorContextType {
    folders: string[];
    contents: string[];
    addItemToContents: (item: string) => void;
    fetchAndRenderCurrentFolder: () => void;
    goBack: () => void;
}

export const NavigatorContext = createContext<NavigatorContextType>({
    folders: [],
    contents: [],
    addItemToContents: () => {},
    fetchAndRenderCurrentFolder: () => {},
    goBack: () => {}
});

// Component

export const Navigator: React.FC<Children> = () => {
    const [folders, setFolders] = useState(["ROOT"]);
    const [contents, setContents] = useState([""]);
    const rendered = useRef(false);

    // Buttons

    const selectItem = (name: string) => {
        // if yt link
            // that's a whole thing
        // else assume folder
        const updatedFolders = [...folders, name];
        setFolders(updatedFolders);
    };

    // Changing current folder

    useEffect(() => {
        fetchAndRenderCurrentFolder();
    }, [folders]);

    const fetchAndRenderCurrentFolder = async () => {
        const currentFolder = await getFolderByName(folders[folders.length - 1]);
        if (currentFolder) {
            setContents(currentFolder.contents);
        }
    };

    // Triggered by children
    
    const addItemToContents = async (item: string) => {
        if (item.split('/')[0] === 'https:'){
            let title = await getVideoName(item);

        } else {
            const updatedContents = [...contents, item];
            setContents(updatedContents);
        }
    }

    useEffect(() => {
        // Loading screen
        if (!rendered.current && contents[0] != "") {
            rendered.current = true;
        }
        // update database when local changes are detected
        if (rendered.current) {
            uploadLocalChanges();
        }
    }, [contents]);

    const uploadLocalChanges = async () => {
        // update in MongoDB if changes occur after render     
        const folderName = folders[folders.length - 1];
        const updatedFolder = {
            name: folderName,
            contents: contents
        }
        updateFolder(folderName, updatedFolder);
        // check for new folders to add to database
        for (let itemName of contents){
            // todo: add YT item check
            try {
                await getFolderByName(itemName);
            } catch (err) {
                createFolder(itemName);
            }
        }
    }

    // back button
    const goBack = () => {
        const updated = [...folders];
        updated.pop();
        setFolders(updated);
    }

    // Using useMemo to avoid unnecessary re-renders
    const contextValue = useMemo(() => ({
        folders, contents, addItemToContents, fetchAndRenderCurrentFolder, goBack
    }), [folders, contents, addItemToContents]);

    return (
        <NavigatorContext.Provider value={contextValue}>
            <IconContext.Provider value={{ size: "3em", className: "global-class-name" }}> 
                {rendered.current && (<>
                    <h1>Genrefi</h1>
                    <h2>{folders[folders.length - 1]}:</h2>
                    <ItemMover />
                    <br /><br />
                    <YouTubePlayer />
                    <div className="card">
                        <div className="grid-container">
                            {contents.map((itemName) => (
                                <button key={itemName} onClick={() => selectItem(itemName)} className="grid-item">
                                    {itemName}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ContentAdder />
                    <br /><br />
                    {folders.length > 1 && (
                        <button onClick={goBack}>
                            <FaPersonWalkingArrowLoopLeft  />
                        </button>
                    )}
                </>)}
            </IconContext.Provider>
        </NavigatorContext.Provider>
    );
};