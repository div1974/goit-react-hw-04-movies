import React from "react";
import { Link } from "react-router-dom";
import imagePath from "../img/404notfound.jpg";

const styles = {
  container: { textAlign: "center" },
  status: { fontSize: 96, marginBottom: 16 },
};

const NotFound = () => (
  <div style={styles.container}>
    <h1 style={styles.status}>404</h1>
    <img src={imagePath} alt="cat detective" width="320" />
    <p>
      Oops, page not found. There is Вот <Link to="/">link</Link> on main page
    </p>
  </div>
);

export default NotFound;
