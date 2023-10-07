import React from "react";
import PropTypes from "prop-types";
import { FaTimes, FaEdit } from "react-icons/fa";

const today = new Date();

const Item = ({ id, date, description, onDelete, onUpdate }) => {
  return (
    <div className="todo">
      <div className="todo-header">
        <>{date}</>
      </div>
      <br />
      <>{description}</>
      <br />
      <div className="todo-footer">
        <div>
          <FaTimes
            style={{ color: "#aa405a" }}
            onClick={() => onDelete(id)}
          /> Delete
        </div>
        <div>
          <FaEdit
            style={{ color: "blue" }}
            onClick={() => onUpdate(id)}
          /> Edit
        </div>
      </div>
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
