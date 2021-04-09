import styles from "./uploadbtn.module.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Row } from "react-bootstrap";

const UploadBtn = ({ setShow }) => {
  return (
    <Row className="mx-auto">
      <div
        className={`${styles.container} d-flex flex-nowrap`}
        onClick={() => {
          setShow(true);
        }}
      >
        <div className="my-auto">
          <FaPlus
            size={35}
            className={styles.btn}
            style={{ display: "block" }}
          />
        </div>

        <span className={`my-auto ${styles.text}`}>Add to the Capsule</span>
      </div>
    </Row>
  );
};

export default UploadBtn;
