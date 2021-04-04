import { useState } from "react";
import { addImage } from "../util/api";
import styles from "./upload.module.css";

const Upload = () => {
  const [file, setFile] = useState();
  const [img_url, setImgURL] = useState();
  const onSubmit = async (e) => {
    e.preventDefault();
    await addImage(file);
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setImgURL(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={onChange}
          accept="image/x-png,image/gif,image/jpeg"
        />
        <button type="submit">Upload</button>
      </form>
      <img src={img_url} />
    </div>
  );
};

export default Upload;
