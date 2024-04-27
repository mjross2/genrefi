import React, { useEffect, useState, useMemo, createContext, ReactNode } from 'react';
import ContentAdder from './ContentAdder';
import { getFolderByName } from '../api/folder';

// Overhead

interface Children {
    children: ReactNode;
}

interface NavigatorContextType {
    folders: string[];
    contents: string[];
    setContents: (updated: string[]) => void;
}

export const NavigatorContext = createContext<NavigatorContextType>({
    folders: [],
    contents: [],
    selectItem: () => {}
});

// Component

export const Navigator: React.FC<Children> = ({children}) => {
    const [folders, setFolders] = useState(["ROOT"]);
    const [contents, setContents] = useState([]);

    useEffect(() => {
        fetchAndRenderCurrentFolder();
    }, [folders]);

    const selectItem = (name: string) => {
        // Implementation of how to select an item
    };

    const fetchAndRenderCurrentFolder = async () => {
        const currentFolder = await getFolderByName(folders[folders.length - 1]);
        if (currentFolder) {
            setContents(currentFolder.contents);
        }
    };

    // Using useMemo to avoid unnecessary re-renders
    const contextValue = useMemo(() => ({
        folders, contents, setContents
    }), [folders, contents, setContents]);

    return (
        <NavigatorContext.Provider value={contextValue}>
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
        </NavigatorContext.Provider>
    );
};