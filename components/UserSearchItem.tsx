import React from "react";

interface UserSearchItemProps {
  option?;
}

const UserSearchItem: React.FC<UserSearchItemProps> = ({
  option,
  ...props
}) => {
  return (
    <li
      {...props}
      style={{
        display: "flex",
        marginBlock: "3px",
        padding: "3px 10px",
        alignItems: "center",
      }}
    >
      <span
        style={{
          marginLeft: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: "15px", lineHeight: "15px" }}>
          {option?.inputValue || option?.displayName}
        </span>
        <span style={{ fontSize: "12px", color: "gray" }}>
          {option?.username}
        </span>
      </span>
    </li>
  );
};

export default UserSearchItem;
