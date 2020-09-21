import React from "react";
import Appbar from "../Appbar";
import PropTypes from "prop-types";
import styles from "../Layout/Layout.module.css";

const Layout = ({ children }) => (
  <div className={styles.mainLayout}>
    <Appbar />
    <hr />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
