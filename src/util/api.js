import axios from "axios";
import { Base } from "./base";

const addImage = async (file, color, caption, tags) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "upload_preset");

  console.log("Creating image url");
  let url = null;
  if (!color) {
    url = await axios.post(
      `https://api.cloudinary.com/v1_1/yale-wli/image/upload`,
      formData
    );
  }
  console.log("Saving in database");
  await axios.post(`${Base}/image/upload`, {
    url: url ? url.data.url : null,
    color,
    caption,
    tags,
  });

  return;
};

const getImages = async (status) => {
  let images = await axios.post(`${Base}/image/get`, { status: status });
  return images;
};

export { addImage, getImages };
