import React, { useEffect, useState, useMemo, createContext, ReactNode, useRef } from 'react';
import ContentAdder from './ContentAdder';
import { getFolderByName, updateFolder, createFolder } from '../api/folder';

// Overhead

interface Children {
    children: ReactNode;
}

interface NavigatorContextType {
    folders: string[];
    contents: string[];
    addItemToContents: (item: string) => void;
}

export const NavigatorContext = createContext<NavigatorContextType>({
    folders: [],
    contents: [],
    addItemToContents: () => {}
});

// Component

export const Navigator: React.FC<Children> = () => {
    const [folders, setFolders] = useState(["ROOT"]);
    const [contents, setContents] = useState([""]);
    const rendered = useRef(false);

    useEffect(() => {
        if (!rendered.current && contents[0] != "") {
            rendered.current = true;
        }
        if (rendered.current) {
            uploadLocalChanges();
        }
    }, [contents]);

    useEffect(() => {
        fetchAndRenderCurrentFolder();
    }, [folders]);

    const uploadLocalChanges = async () => {
        // update in MongoDB if changes occur after render     
        const folderName = folders[getFolderByName.length - 1];
        const updatedFolder = {
            name: folderName,
            contents: contents
        }
        updateFolder(folderName, updatedFolder);
        // check for new folders to add to database
        for (let itemName of contents){
            // todo: add YT item check
            try {
                const remoteFolder = await getFolderByName(itemName);
                alert(remoteFolder);
            } catch (err) {
                createFolder(itemName);
            }
        }
    }

    const selectItem = (name: string) => {
        // if yt link
            // that's a whole thing
        // else assume folder
            // add to folder array and rerender
    };

    const fetchAndRenderCurrentFolder = async () => {
        const currentFolder = await getFolderByName(folders[folders.length - 1]);
        if (currentFolder) {
            setContents(currentFolder.contents);
        }
    };

    const addItemToContents = (item: string) => {
        const updatedContents = [...contents, item];
        setContents(updatedContents);
    }

    // Using useMemo to avoid unnecessary re-renders
    const contextValue = useMemo(() => ({
        folders, contents, addItemToContents
    }), [folders, contents, addItemToContents]);

    return (
        <NavigatorContext.Provider value={contextValue}>
            {rendered.current && (<>
                <h1>Genrefi</h1>
                <p>{folders[folders.length - 1]}:</p>
                <div className="card">
                    <ul>
                        {contents.map((itemName) => (
                            <li key={itemName}>
                                <button onClick={() => selectItem(itemName)}>
                                    {itemName}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <ContentAdder />
            </>)}
        </NavigatorContext.Provider>
    );
};