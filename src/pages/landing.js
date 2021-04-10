import { useState, useEffect, useCallback } from "react";
import UploadBtn from "../components/uploadbtn";
import UploadModal from "../components/uploadmodal";
import { getAll, getImage, getColor } from "../util/api";
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
  const [imageData, setImageData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [imgShow, setImgShow] = useState({});
  const [tags, setTags] = useState([]);

  const fetchImage = async (filename) => {
    // console.log(filename);
    let image = await getImage(filename);
    return image;
  };

  const fetchColor = async (id) => {
    let color = await getColor(id);
    return color;
  };

  const status = "approved";

  const fetchImages = useCallback(async () => {
    let data = await getAll(status);
    data = data.data;
    const files = data.filenames;
    const color_ids = data.color_ids;

    // console.log(files);
    // console.log(color_ids);

    if (!files.length) {
      setImages([]);
      setImageData([]);
    }

    if (!color_ids.length) {
      setColorData([]);
    }

    if (!files.length && !color_ids.length) {
      setLoading(false);
      return;
    }

    let fetched = [];
    let metadata = [];

    files.forEach(async (file) => {
      let fetchedImage = await fetchImage(file);
      if (fetchedImage && fetchedImage.data && fetchedImage.data.data) {
        fetched.push(fetchedImage.data.data);
        metadata.push({
          contentType: fetchedImage.data.contentType,
          upvoted: fetchedImage.data.upvoted,
          downvoted: fetchedImage.data.downvoted,
          tags: fetchedImage.data.tags,
          caption: fetchedImage.data.caption,
          filename: file,
        });
      }
      if (fetched.length === files.length) {
        setImageData(metadata.reverse());
        setImages(fetched.reverse());
      }
      if (colors.length + fetched.length === color_ids.length + files.length) {
        setLoading(false);
      }
    });

    let colors = [];

    color_ids.forEach(async (id) => {
      let fetchedColor = await fetchColor(id);
      if (fetchedColor && fetchedColor.data) {
        colors.push({
          color: fetchedColor.data.color,
          upvoted: fetchedColor.data.upvoted,
          downvoted: fetchedColor.data.downvoted,
          tags: fetchedColor.data.tags,
          caption: fetchedColor.data.caption,
        });
      }
      if (colors.length + fetched.length === color_ids.length + files.length) {
        setLoading(false);
      }
      if (colors.length === color_ids.length) {
        setColorData(colors);
      }
    });
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
        {all_tags.map((tag) => (
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
          >
            {tag}
          </StyledTag>
        ))}
      </Row>
      <Row className="mx-auto">
        {loading ? (
          <div className="d-flex" style={{ width: "100vw", height: "100vh" }}>
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
            {images
              .filter((image, index) => {
                const intersection = tags.filter((val) =>
                  imageData[index].tags.includes(val)
                );
                if (tags.length > 0 && intersection.length === 0) {
                  return false;
                }
                return true;
              })
              .map((image, index) => (
                <Image
                  setImgShow={setImgShow}
                  key={index}
                  src={`data:${imageData[index].contentType};base64,${image}`}
                  data={imageData[index]}
                />
              ))}
            {colorData
              .filter((color) => {
                const intersection = tags.filter((val) =>
                  color.tags.includes(val)
                );
                if (tags.length > 0 && intersection.length === 0) {
                  return false;
                }
                return true;
              })
              .map((color, index) => (
                <Image
                  setImgShow={setImgShow}
                  key={index + images.length}
                  color={color.color}
                  data={color}
                />
              ))}
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
