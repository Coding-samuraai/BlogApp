import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
function Avtr() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarColor, setAvatarColor] = useState(deepOrange[500]);
  const navigate = useNavigate();

  const handleClickMyPosts = () => {
    navigate("/my-posts");
    handleClose();
  };

  const { $id, name, email } = useSelector((state) => {
    return state.auth.userData;
  });

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  async function getUserAvatarColor() {
    try {
      const userPreferences = await service.getUserPreferences($id);

      setAvatarColor(userPreferences.avatarColor);
    } catch (error) {
      console.log("Error fetching user avatar color:", error);
    }
  }

  useEffect(() => {
    getUserAvatarColor();
  }, [$id]);

  return (
    <div>
      <Avatar sx={{ bgcolor: avatarColor }} onClick={handleClick}>
        {name[0]}
      </Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <div className="font-bold text-lg">{email.split("@")[0]}</div>
        </MenuItem>
        <MenuItem onClick={handleClickMyPosts}>My Posts</MenuItem>
        <MenuItem onClick={handleClose}>{<LogoutBtn />}</MenuItem>
      </Menu>
    </div>
  );
}

export default Avtr;
