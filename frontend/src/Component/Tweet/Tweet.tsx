import React from "react";
import Box from "@mui/material/Box";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import "./tweet.css";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import { Link } from "react-router-dom";

interface TweetProps {
  user: {
    fullname: string;
    name: string;
    userAvatar: string;
  };
  _id: string;
  text: string;
}

export const Tweet: React.FC<TweetProps> = ({
  user,
  text,
  _id,
}: TweetProps): React.ReactElement => {
  return (
    <>
      <Box className="tweet">
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
                  <a>@{user.name}</a>
                  <span>· 1 ч</span>
                </Typography>
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
      </Box>
    </>
  );
};
