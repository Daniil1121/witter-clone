import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import TagIcon from "@mui/icons-material/Tag";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button, IconButton, Typography } from "@mui/material";
import "./SideMenu.css";
import { Link } from "react-router-dom";

export const SideMenu: React.FC = (): React.ReactElement => {
  return (
    <List>
      <Link to={"/home"}>
        <ListItem>
          <IconButton aria-label="delete" size="medium">
            <TwitterIcon sx={{ fontSize: "42px" }} color="primary" />
          </IconButton>
        </ListItem>
      </Link>
      <ListItem>
        <IconButton aria-label="delete" size="medium">
          <TagIcon
            sx={{ transform: "skew(-5deg)" }}
            className="sidenav_icon_button"
            fontSize="medium"
          />
          <Typography className="sidenav_text_button">Поиск</Typography>
        </IconButton>
      </ListItem>
      <ListItem>
        <IconButton aria-label="delete" size="medium">
          <NotificationsNoneIcon
            fontSize="medium"
            className="sidenav_icon_button"
          />
          <Typography className="sidenav_text_button">Уведомления</Typography>
        </IconButton>
      </ListItem>
      <ListItem>
        <IconButton aria-label="delete" size="medium">
          <MailOutlineIcon fontSize="medium" className="sidenav_icon_button" />
          <Typography className="sidenav_text_button">Сообщения</Typography>
        </IconButton>
      </ListItem>
      <ListItem>
        <IconButton aria-label="delete" size="medium">
          <BookmarkBorderIcon
            fontSize="medium"
            className="sidenav_icon_button"
          />
          <Typography className="sidenav_text_button">Закладки</Typography>
        </IconButton>
      </ListItem>
      <ListItem>
        <IconButton aria-label="delete" size="medium">
          <ArticleOutlinedIcon
            fontSize="medium"
            className="sidenav_icon_button"
          />
          <Typography className="sidenav_text_button">Список</Typography>
        </IconButton>
      </ListItem>
      <ListItem>
        <IconButton aria-label="delete" size="medium">
          <PermIdentityIcon fontSize="medium" className="sidenav_icon_button" />
          <Typography className="sidenav_text_button">Профиль</Typography>
        </IconButton>
      </ListItem>
      <ListItem>
        <Button fullWidth variant="contained">
          Твитнуть
        </Button>
      </ListItem>
    </List>
  );
};
