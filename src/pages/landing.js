import { useState, useEffect, useCallback } from "react";
import UploadBtn from "../components/uploadbtn";
import UploadModal from "../components/uploadmodal";
import { getImages } from "../util/api";
import styles from "./landing.module.css";
import { Row, Spinner } from "react-bootstrap";
import Image from "../components/image";
import ImageModal from "../components/imagemodal";
import styled from "styled-components";

const StyledTag = styled.div`
  padding: 5px 10px;
  border-radius: 20px;
  margin: 0px 10px 10px 0;
  transition: filter 0.2s;
  background-color: white;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(90%);
    cursor: pointer;
  }
`;

const Landing = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [imgShow, setImgShow] = useState({});
  const [tags, setTags] = useState([]);

  const status = "approved";

  const fetchImages = useCallback(async () => {
    let data = await getImages(status);
    if (data && data.data && data.data.images) {
      setImages(data.data.images.reverse());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchImages();
  }, [fetchImages]);

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
    <div className="d-flex flex-column p-4 mt-2">
      <Row className="mx-auto">
        <span>
          <div className={styles.welcome}>Welcome to the wli</div>
          <div className={styles.title}>COVID-19 Time Capsule</div>
          <div
            style={{
              backgroundColor: "white",
              border: "2px solid black",
              padding: "10px",
              borderRadius: "12px",
            }}
          >
            <div className={styles.subtext}>
              This media gallery is a visual and written history centering
              around our community’s collective COVID-19 experience.
            </div>
            <div className={styles.subtext}>
              Browse through experiences of connection, separation, resilience,
              struggle, love, and fear.
            </div>
            <div className={styles.subtext}>
              Click the upload button at the bottom left of your screen to add
              your own memory to the wall—a photo, a passage, a memory.
            </div>
            <div className={styles.subtext}>
              Feel free to contact us with questions at&nbsp;
              <a href="mailto:womensleadershipinitiative@gmail.com">
                womensleadershipinitiative@gmail.com
              </a>
              .
            </div>
          </div>
        </span>
      </Row>
      <Row className="mx-auto justify-content-center mt-3">
        {all_tags.map((tag, index) => (
          <StyledTag
            onClick={() => {
              let temp = [...tags];
              if (temp.includes(tag)) {
                const index = temp.indexOf(tag);
                if (index !== -1) temp.splice(index, 1);
              } else {
                temp.push(tag);
              }
              setTags(temp);
            }}
            style={{
              backgroundColor: tags.includes(tag) ? "#21cbc0" : "white",
            }}
            key={index}
          >
            {tag}
          </StyledTag>
        ))}
      </Row>
      <Row className="mx-auto">
        {loading ? (
          <div className="d-flex mt-5">
            <Spinner
              className="m-auto"
              animation="border"
              role="status"
              style={{ width: "100px", height: "100px" }}
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row
            className="mx-auto mt-5 justify-content-center"
            style={{ marginBottom: "80px" }}
          >
            {images.map((image, index) => {
              const intersection = tags.filter((val) =>
                image.tags.includes(val)
              );
              if (tags.length > 0 && intersection.length === 0) {
                return null;
              }
              return (
                <Image
                  setImgShow={setImgShow}
                  key={index}
                  src={image.url}
                  color={image.color === "null" ? null : image.color}
                  data={image}
                />
              );
            })}
            {images.length === 0 ? (
              <div style={{ fontWeight: 600, fontSize: "24px", opacity: 0.6 }}>
                No Submissions
              </div>
            ) : null}
          </Row>
        )}
      </Row>
      <div className={styles.btn}>
        <UploadBtn setShow={setShow} />
      </div>
      <ImageModal show={imgShow} setShow={setImgShow} />
      <UploadModal show={show} setShow={setShow} />
    </div>
  );
};

export default Landing;
