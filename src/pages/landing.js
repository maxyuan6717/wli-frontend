import { useState, useEffect, useCallback } from "react";
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

  const fetchImages = useCallback(async () => {
    let files = await getAll("approved");
    files = files.data;

    if (!files.length) {
      setLoading(false);
      setImages([]);
      setTypes([]);
      return;
    }
    let fetched = [];
    let contentTypes = [];
    files.forEach(async (file, index) => {
      let fetchedImage = await fetchImage(file);
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
  }, []);
  useEffect(() => {
    setLoading(true);
    fetchImages();
  }, [fetchImages]);

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
