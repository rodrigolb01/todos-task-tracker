import React from "react";
import PropTypes from "prop-types";
import { FaTimes, FaEdit } from "react-icons/fa";

const today = new Date();

const Item = ({ id, date, description, onDelete, onUpdate }) => {
  return (
    <div className="goal">
      <h4>{date}</h4>
      <br></br>
      <h3>{description}</h3>
      <FaTimes
        style={{ color: "#aa405a" }}
        onClick={() => onDelete(id)}
      /> Delete
      <FaEdit
        style={{ color: "blue" }}
        onClick={() => onUpdate(id)}
      /> Edit
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
