import styled from "styled-components";
import { Row, Modal, Col } from "react-bootstrap";
import ColorImg from "./color";

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 20px;
    border: 2px solid black;
  }
`;

const StyledTag = styled.div`
  padding: 5px 10px;
  border-radius: 20px;
  margin: 0px 10px 10px 0;
  transition: filter 0.2s;
  background-color: #cdf4d5;
`;

const CurvedContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  width: 200px;
`;

const ImageModal = ({ show, setShow }) => {
  return (
    <StyledModal
      size="lg"
      centered
      show={show.data ? true : false}
      onHide={() => {
        setShow({});
      }}
    >
      <Modal.Header closeButton />
      {show.data && (
        <Modal.Body className="p-5">
          <Row className="mx-auto">
            <Col md={4} className="pl-0 pr-4">
              <CurvedContainer>
                {show.src ? (
                  <img src={show.src} width="100%" alt="capsule_pic" />
                ) : (
                  <ColorImg color={show.color} caption={show.data.caption} />
                )}
              </CurvedContainer>
            </Col>
            <Col md={8} className="pr-0 pl-4">
              <Row className="mx-auto mb-3">
                {show.data.tags.map((tag) => (
                  <StyledTag>{tag}</StyledTag>
                ))}
              </Row>
              <Row className="mx-auto">{show.data.caption}</Row>
            </Col>
          </Row>
        </Modal.Body>
      )}
    </StyledModal>
  );
};

export default ImageModal;
