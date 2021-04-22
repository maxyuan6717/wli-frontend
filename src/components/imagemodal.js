import styled from "styled-components";
import { Row, Modal, Col } from "react-bootstrap";
import ColorImg from "./color";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

const StyledBtn = styled.div`
  position: absolute;
  top: calc(50% - 10px);

  &:hover {
    cursor: pointer;
  }

  &.left {
    left: 12px;
  }

  &.right {
    right: 12px;
  }
`;

const ImageModal = ({ images, indx, setIndx }) => {
  return (
    <StyledModal
      size="lg"
      centered
      show={indx !== -1 ? true : false}
      onHide={() => {
        setIndx(-1);
      }}
    >
      <Modal.Header closeButton />
      {indx !== -1 && (
        <Modal.Body className="p-5">
          <Row className="mx-auto">
            <Col md={4} className="pl-0 pr-4">
              <CurvedContainer>
                {images[indx].url ? (
                  <img src={images[indx].url} width="100%" alt="capsule_pic" />
                ) : (
                  <ColorImg
                    color={images[indx].color}
                    caption={images[indx].caption}
                  />
                )}
              </CurvedContainer>
            </Col>
            <Col md={8} className="pr-0 pl-4">
              <Row className="mx-auto mb-3">
                {images[indx].tags.map((tag, index) => (
                  <StyledTag key={index}>{tag}</StyledTag>
                ))}
              </Row>
              <Row className="mx-auto">{images[indx].caption}</Row>
            </Col>
          </Row>
          {indx > 0 && (
            <StyledBtn className="left" onClick={() => setIndx(indx - 1)}>
              <FaChevronLeft style={{ display: "block" }} size={20} />
            </StyledBtn>
          )}
          {indx < images.length - 1 && (
            <StyledBtn className="right" onClick={() => setIndx(indx + 1)}>
              <FaChevronRight style={{ display: "block" }} size={20} />
            </StyledBtn>
          )}
        </Modal.Body>
      )}
    </StyledModal>
  );
};

export default ImageModal;
