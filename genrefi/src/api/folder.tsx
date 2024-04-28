import axios from "axios";

const BASE_URL = "http://localhost:5000/folders";

export const createFolder = async (name: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/`, {
      name: name,
    });
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getFolders = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

export const addToFolder = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getFolderByName = async (name: any) => {
  try {
    const res = await axios.get(`${BASE_URL}/name/${name}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

// updates folder by name
export const updateFolder = async (name: any, updatedFolder: any) => {
  console.log(updatedFolder)
  try {
    const res = await axios.patch(`${BASE_URL}/name/${name}`, updatedFolder);
    if (res.status === 201) {
      console.log('201');
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};