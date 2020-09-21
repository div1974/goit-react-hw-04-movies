import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./Loader.module.css";

export default function Spinner() {
  return (
    <div className={styles.Loader}>
      <Loader type="TailSpin" color="#00BFFF" height={60} width={60} />;
    </div>
  );
}
