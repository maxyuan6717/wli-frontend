import styles from "./uploadbtn.module.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Row } from "react-bootstrap";

const UploadBtn = () => {
  return (
    <Link to="/upload" className={styles.link}>
      <Row className="mx-auto">
        <div className={`${styles.container} d-flex flex-nowrap`}>
          <div className="my-auto">
            <FaPlus
              size={25}
              className={styles.btn}
              style={{ display: "block" }}
            />
          </div>

          <span className={`my-auto ${styles.text}`}>Upload a pic</span>
        </div>
      </Row>
    </Link>
  );
};

export default UploadBtn;
