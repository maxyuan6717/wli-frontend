import { useState } from "react";
import { addImage } from "../util/api";
import { Form, Button, Modal } from "react-bootstrap";
import styles from "./uploadmodal.module.css";

const UploadModal = ({ show, setShow }) => {
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
    <Modal
      size="lg"
      centered
      show={show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload an Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <img src={img_url} width={100} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UploadModal;
