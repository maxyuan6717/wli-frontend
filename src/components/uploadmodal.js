import { useState } from "react";
import { addImage } from "../util/api";
import { Form, Button, Modal, Row } from "react-bootstrap";
import styles from "./uploadmodal.module.css";
import styled from "styled-components";
import { BsCloudUpload } from "react-icons/bs";
import { IoColorPaletteOutline } from "react-icons/io5";
import { AiOutlineCheck } from "react-icons/ai";

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 20px;
    border: 2px solid black;
  }
`;

const StyledHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const StyledRequired = styled.span`
  color: #ff4545;
`;

const StyledColor = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 30px;
  margin: 0 10px;
  transition: transform 0.2s;
  display: flex;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const StyledButton = styled(Button)`
  background-color: #21cbc0;
  padding: 10px 20px;
  border-radius: 20px;
  transition: filter 0.2s;
  border: none;

  &:hover,
  &:active,
  &:focus {
    filter: brightness(90%);
    background-color: #21cbc0;
  }
`;

const StyledTag = styled.div`
  padding: 5px 10px;
  border-radius: 20px;
  margin: 10px 10px 10px 0;
  transition: filter 0.2s;
  background-color: #cdf4d5;

  &:hover {
    filter: brightness(90%);
    cursor: pointer;
  }
`;

const UploadModal = ({ show, setShow }) => {
  const [file, setFile] = useState();
  //   const [img_url, setImgURL] = useState();
  const [color_clicked, setColorClicked] = useState(false);
  const [color, setColor] = useState();
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState([]);
  const [err, setErr] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    if ((!file && !color) || caption.length === 0 || tags.length === 0) {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
      return;
    }
    await addImage(file, color, caption, tags);
    setShow(false);
    // setImgURL(null);
    setFile(null);
    setColor(null);
    setCaption("");
    setTags([]);
    setErr(false);
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setColor(null);
    // setImgURL(URL.createObjectURL(e.target.files[0]));
  };

  const icon_size = 80;
  const colors = ["#3b57ab", "#f67094", "#21cbc0"];
  const all_tags = [
    "Connection",
    "Separation",
    "Resilience",
    "Struggle",
    "Love",
    "Fear",
    "Others",
  ];

  return (
    <StyledModal
      size="lg"
      centered
      show={show}
      onHide={() => {
        setShow(false);
        // setImgURL(null);
        setFile(null);
        setColorClicked(false);
        setColor(null);
        setTags([]);
        setCaption("");
        setErr(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add to the Capsule
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <StyledHeader>
            Select a cover image. <StyledRequired>*</StyledRequired>
          </StyledHeader>
          <Form onSubmit={onSubmit}>
            <Row className="mx-auto my-3">
              <label
                className={`my-auto d-flex flex-column ${
                  file ? styles.selected : styles.upload
                }`}
                style={{ cursor: "pointer" }}
              >
                <input
                  type="file"
                  name="file"
                  onChange={onChange}
                  accept="image/*"
                />
                {file && file.name ? (
                  <div className="my-auto">
                    <div className="text-center" style={{ fontSize: "18px" }}>
                      {file.name}
                    </div>
                    <div className={styles.subtext}>
                      Click again to change file
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mx-auto">
                      <BsCloudUpload
                        size={icon_size}
                        style={{ display: "block" }}
                      />
                    </div>
                    <div>Upload image</div>
                  </>
                )}
              </label>
              <div className={`my-auto mx-5 ${styles.or}`}>OR</div>
              <div
                className={`my-auto d-flex flex-column ${
                  color
                    ? styles.selected
                    : !color_clicked
                    ? styles.upload
                    : styles.colors
                }`}
                onClick={() => {
                  setColorClicked(true);
                }}
              >
                {color_clicked ? (
                  <Row className="mx-auto my-auto">
                    {colors.map((cur, index) => {
                      return (
                        <StyledColor
                          style={{ backgroundColor: cur }}
                          onClick={() => {
                            setColor(cur);
                            setFile(null);
                          }}
                          key={index}
                        >
                          <span className="m-auto">
                            {color === cur ? (
                              <AiOutlineCheck
                                style={{ display: "block" }}
                                size={20}
                                color="white"
                              />
                            ) : (
                              ""
                            )}
                          </span>
                        </StyledColor>
                      );
                    })}
                  </Row>
                ) : (
                  <>
                    <div className="mx-auto">
                      <IoColorPaletteOutline
                        size={icon_size}
                        style={{ display: "block" }}
                      />
                    </div>
                    <div>Select a color</div>
                  </>
                )}
              </div>
            </Row>
            <StyledHeader>
              Write a caption or passage. <StyledRequired>*</StyledRequired>
            </StyledHeader>
            <Row className="mx-auto mb-3">
              <textarea
                style={{ width: "70%" }}
                rows={3}
                value={caption}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
              />
            </Row>
            <StyledHeader>
              Select at least one tag. <StyledRequired>*</StyledRequired>
            </StyledHeader>
            <div style={{ width: "250px" }}>
              <Row className="mx-auto mb-4">
                {all_tags.map((tag, index) => (
                  <StyledTag
                    onClick={() => {
                      let temp = [...tags];
                      if (tags.includes(tag)) {
                        const index = tags.indexOf(tag);
                        if (index !== -1) {
                          temp.splice(index, 1);
                        }
                      } else {
                        temp.push(tag);
                      }
                      setTags(temp);
                    }}
                    style={{
                      border: tags.includes(tag)
                        ? "2px solid black"
                        : "2px solid #cdf4d5",
                    }}
                    key={index}
                  >
                    {tag}
                  </StyledTag>
                ))}
              </Row>
            </div>
            <Row className="mx-auto">
              <StyledButton type="submit">
                <span className={styles.upload_btn}>Submit</span>
              </StyledButton>
              {err ? <div>Please fill in all required sections</div> : null}
            </Row>
          </Form>
        </div>
      </Modal.Body>
    </StyledModal>
  );
};

export default UploadModal;
