import React from "react";
import PropTypes from "prop-types";
import { FaTimes, FaEdit } from "react-icons/fa";
import "../App.css";

const today = new Date();

const Item = ({ id, date, description, onDelete, onUpdate }) => {
  return (
    <div className="Item-Container">
      <h3>{date}</h3>
      <br></br>
      <h3>{description}</h3>
      <FaTimes
        style={{ color: "#aa405a" }}
        onClick={() => onDelete(id)}
      ></FaTimes>
      <FaEdit style={{ color: "blue" }} onClick={() => onUpdate(id)}></FaEdit>
    </div>
  );
};

Item.defaultProps = {
  date:
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
  description: "none",
};

Item.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
};

export default Item;
