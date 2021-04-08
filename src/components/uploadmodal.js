import { useState } from "react";
import { addImage } from "../util/api";
import { Form, Button, Modal, Row } from "react-bootstrap";
import styles from "./uploadmodal.module.css";

const UploadModal = ({ show, setShow }) => {
  const [file, setFile] = useState();
  const [img_url, setImgURL] = useState();
  const onSubmit = async (e) => {
    e.preventDefault();
    await addImage(file);
    setShow(false);
    setImgURL(null);
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
        setImgURL(null);
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
            <Row className="mx-auto">
              <input
                type="file"
                name="file"
                onChange={onChange}
                accept="image/x-png,image/gif,image/jpeg"
              />
            </Row>
            <Row className="mx-auto">
              <img src={img_url} width={400} />
            </Row>
            <Row className="mx-auto">
              <Button type="submit">Upload</Button>
            </Row>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UploadModal;
