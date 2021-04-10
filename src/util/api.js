import axios from "axios";
import { Base } from "./base";

const addImage = async (file, color, caption, tags) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("color", color);
  formData.append("caption", caption);
  formData.append("tags", tags);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  console.log("Sending image");
  let image = await axios.post(`${Base}/image/upload`, formData, config);
  return image;
};

const getAll = async (status) => {
  let filenames = await axios.post(`${Base}/image/all`, { status: status });
  return filenames;
};

const getImage = async (filename) => {
  let image = await axios.post(`${Base}/image/getImage`, { filename });
  return image;
};

const getColor = async (id) => {
  let color = await axios.post(`${Base}/image/getColor`, { id });
  return color;
};

export { addImage, getAll, getImage, getColor };
