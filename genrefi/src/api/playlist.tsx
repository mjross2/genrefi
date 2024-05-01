import axios from "axios";

import { createRealPlaylist } from './youtube';

const BASE_URL = "http://localhost:5000/playlists";

export const createPlaylist = async (folder: string) => {
  try {
    const realPlaylist = await createRealPlaylist(folder);
    const playlistId = realPlaylist.id;
    const res = await axios.post(`${BASE_URL}/`, {
      folder: folder,
      youTubeId: playlistId
    });
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getPlaylists = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

export const addToPlaylist = async (folder: string, videoId: string) => {
  try {
    // get playlist by folder
    const playlist = await getPlaylistByFolder(folder);
    const playlistId = playlist.youTubeId;
    // use Youtube API to check if video is already in playlist
  } catch (error) {
    throw error;
  }
};

// creates playlists if it doesn't exist
export const getPlaylistByFolder = async (folder: any) => {
  try {
    const res = await axios.get(`${BASE_URL}/folder/${folder}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    try{
      return await createPlaylist(folder);
    } catch (e) {
      throw e;
    }
  }
};

// updates playlist by folder
export const updatePlaylist = async (folder: any, updatedPlaylist: any) => {
  try {
    const res = await axios.patch(`${BASE_URL}/folder/${folder}`, updatedPlaylist);
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};