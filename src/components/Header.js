import React from "react";
import PropTypes from "prop-types";

const Header = ({ title }) => {
  return <div>{title}</div>;
};

Header.defaultProps = {
  title: "task todos list",
};

Header.propTypes = {
  title: PropTypes.string,
};
export default Header;
