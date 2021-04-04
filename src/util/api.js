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
  let images = await axios.get(`${Base}/image/all`);
  return images;
};

export { addImage, getAll };
