import { useState } from "react";
import { addImage } from "../util/api";
import { Form, Button } from "react-bootstrap";
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
      <Form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={onChange}
          accept="image/x-png,image/gif,image/jpeg"
        />
        <Button type="submit">Upload</Button>
      </Form>
      <img src={img_url} />
    </div>
  );
};

export default Upload;
