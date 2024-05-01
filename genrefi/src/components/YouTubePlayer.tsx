import { useContext, useEffect, useState } from "react";
import { NavigatorContext } from "./Navigator";
import { getPlaylistByFolder } from "../api/playlist";

function YouTubePlayer() {
    const [playlistId, setPlaylistId] = useState("PLDHHlzPhoAweXNeAiscSvieMBSs4wZlsw");
    const { folders } = useContext(NavigatorContext);

    const getFolderPlaylist = async () => {
        const playlistInfo = await getPlaylistByFolder(folders[folders.length - 1])
        setPlaylistId(playlistInfo.youTubeId);
    }

    return (
    <>
        <iframe 
            width="560"
            height="315" 
            src={`https://www.youtube.com/embed/videoseries?si=3g4hNrEd5nhTbaXL&amp;list=${playlistId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
        <br /><br />
        <button onClick={getFolderPlaylist}>
            Get current folder's playlist
        </button>
    </>
    )
}

export default YouTubePlayer
