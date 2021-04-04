import { useState, useEffect } from "react";
import UploadBtn from "../components/uploadbtn";
import { getAll, getImage } from "../util/api";
import styles from "./landing.module.css";
import { Col } from "react-bootstrap";

const Landing = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

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
    files.forEach(async (file, index) => {
      let fetchedImage = await fetchImage(file.filename);
      if (fetchedImage && fetchedImage.data && fetchedImage.data.data) {
        fetched.push(fetchedImage.data.data);
      }
      if (index === files.length - 1) {
        setImages(fetched);
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
        {images.map((image) => (
          <img src={`data:image/png;base64,${image}`} height={100} />
        ))}
      </Col>

      <div className={styles.btn}>
        <UploadBtn />
      </div>
    </>
  );
};

export default Landing;
