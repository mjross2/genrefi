import axios from "axios";

const BASE_URL = "http://localhost:5000/";

export const createFolder = async (name: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/folders/`, {
      name: name,
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getFolders = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/folders/`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

export const addToFolder = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/folders/`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getFolderByName = async (name: any) => {
  console.log(`${BASE_URL}/folders/name/${name}`);
  try {
    const res = await axios.get(`${BASE_URL}/folders/name/${name}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};