import { useState, useEffect } from "react";
import UploadBtn from "../components/uploadbtn";
import UploadModal from "../components/uploadmodal";
import { getAll, getImage } from "../util/api";
import styles from "./landing.module.css";
import { Col } from "react-bootstrap";

const Landing = () => {
  const [images, setImages] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const fetchImage = async (filename) => {
    // console.log(filename);
    let image = await getImage(filename);
    return image;
  };

  const fetchImages = async () => {
    let files = await getAll();
    files = files.data;
    // console.log(files);
    let fetched = [];
    let contentTypes = [];
    files.forEach(async (file, index) => {
      let fetchedImage = await fetchImage(file.filename);
      if (fetchedImage && fetchedImage.data && fetchedImage.data.data) {
        fetched.push(fetchedImage.data.data);
        contentTypes.push(fetchedImage.data.contentType);
      }
      if (fetched.length === files.length) {
        setImages(fetched);
        setTypes(contentTypes);
        setLoading(false);
      }
    });
  };
  useEffect(async () => {
    setLoading(true);
    await fetchImages();
  }, []);

  return (
    <>
      <div>{loading ? "LOADING...." : "LOADED"}</div>
      <Col>
        {images.map((image, index) => (
          <img src={`data:${types[index]};base64,${image}`} height={100} />
        ))}
      </Col>

      <div className={styles.btn}>
        <UploadBtn setShow={setShow} />
      </div>
      <UploadModal show={show} setShow={setShow} />
    </>
  );
};

export default Landing;
