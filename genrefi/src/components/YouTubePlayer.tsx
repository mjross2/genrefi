import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import YouTube from 'react-youtube';
import { NavigatorContext } from "./Navigator";

function YouTubePlayer() {
    const [playlistId, setPlaylistId] = useState("PLDHHlzPhoAweXNeAiscSvieMBSs4wZlsw");
    const { folders } = useContext(NavigatorContext);

    return (
    <>
        <iframe 
            width="560"
            height="315" 
            src={`https://www.youtube.com/embed/videoseries?si=3g4hNrEd5nhTbaXL&amp;list=${playlistId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
    </>
    )
}

export default YouTubePlayer
