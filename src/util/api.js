import axios from "axios";
import { Base } from "./base";

const addImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  console.log("Sending image");
  let image = await axios.post(`${Base}/image/upload`, formData, config);
  return image;
};

const getAll = async () => {
  let filenames = await axios.get(`${Base}/image/all`);
  return filenames;
};

const getImage = async (filename) => {
  let image = await axios.post(`${Base}/image/get`, { filename });
  return image;
};

const voteImg = async (filename, vote) => {
  let voted = await axios.get(`${Base}/image/vote`, { filename, vote });
  return voted;
};

export { addImage, getAll, getImage, voteImg };
