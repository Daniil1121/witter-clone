import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Alert, Avatar, Grid, IconButton, Snackbar, Typography } from "@mui/material";
import "./tweet.css";
import moment from "moment";
import "moment/locale/ru";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tweetsApi } from "../../services/api/tweetsApi";
import { useDispatch, useSelector } from "react-redux";
import { deleteTweetAction } from "../../store/ducks/tweets/actionCreators/actionCreators";
import { selectDeleteTweetState } from "../../store/ducks/tweets/selectors";
import { ITweetsState } from "../../store/ducks/tweets/contracts/state";
import SyncSharpIcon from "@mui/icons-material/SyncSharp";
interface TweetProps {
  createdAt: string;
  user: {
    fullname: string;
    username: string;
    userAvatar: string;
  };
  _id: string;
  text: string;
}

export const Tweet: React.FC<TweetProps> = ({
  createdAt,
  user,
  text,
  _id,
}: TweetProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const tweetDeleteState: ITweetsState["deleteTweetState"] = useSelector(selectDeleteTweetState);

  const [pending, setPending] = useState<Boolean>(false);

  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setAnchorEl(null);
  };

  useEffect(() => {
    if (tweetDeleteState === "NEVER") {
      setPending(false);
    }
  }, [tweetDeleteState]);

  const deleteTweet = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setPending(true);
    dispatch(deleteTweetAction(_id));
  };

  return (
    <>
      <Box className={`tweet ${pending && "loading"}`}>
        <Link to={`/home/tweet?tweetId=${_id}`}>
          <Grid container>
            <Grid item xs={1}>
              <Avatar
                sx={{ margin: "0 5px" }}
                src={user.userAvatar}
                alt={`аватар пользователься ${user.fullname}`}
              />
            </Grid>
            <Grid item xs={11}>
              <Box className="tweet_owner">
                <Typography>
                  <b>{user.fullname}</b>
                  <a>@{user.username}</a>
                  <span>· {moment(createdAt).fromNow()}</span>
                </Typography>
                <Box className="control_button">
                  <div>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>Edit tweet</MenuItem>
                      <MenuItem onClick={deleteTweet}>Delete tweet</MenuItem>
                    </Menu>
                  </div>
                </Box>
              </Box>

              <Box className="tweet_body">
                <Typography variant="body1" gutterBottom>
                  {text}
                </Typography>
              </Box>
              <Box className="tweet_footer">
                <IconButton>
                  <ChatBubbleOutlineIcon />1
                </IconButton>
                <IconButton>
                  <RepeatIcon />
                </IconButton>
                <IconButton>
                  <FavoriteBorderIcon />9
                </IconButton>
                <IconButton>
                  <ReplyIcon />2
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Link>
        {pending && <SyncSharpIcon className="loading_icon" />}
      </Box>
    </>
  );
};
