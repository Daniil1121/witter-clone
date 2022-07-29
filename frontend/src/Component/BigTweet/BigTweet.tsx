import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import "./BigTweet.css";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import { Link, useSearchParams } from "react-router-dom";
import { ITweet } from "../../store/ducks/tweets/contracts/state";
import { tweetsApi } from "./../../services/api/tweetsApi";

export const BigTweet: React.FC = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
  const _idSearch: string = searchParams.get("_id")!;
  const [tweet, setTweet] = useState<ITweet>({
    _id: "",
    user: {
      fullname: "",
      name: "",
      userAvatar: "",
    },
    text: "",
  });

  useEffect(() => {
    (async function () {
      const data: ITweet[] = await tweetsApi.fetchTWeetByIdAPI(_idSearch);
      setTweet(data[0]);
    })();
  }, []);

  return (
    <>
      <Box className="tweet">
        <Link to={`/home/tweet?_id=${tweet._id}`}>
          <Grid container>
            <Grid item xs={1}>
              <Avatar
                sx={{ margin: "0 5px" }}
                src={tweet.user.userAvatar}
                alt={`аватар пользователься ${tweet.user.fullname}`}
              />
            </Grid>
            <Grid item xs={11}>
              <Box className="tweet_owner">
                <Typography>
                  <b>{tweet.user.fullname}</b>
                  <a>@{tweet.user.name}</a>
                  <span>· 1 ч</span>
                </Typography>
              </Box>
              <Box className="tweet_body">
                <Typography variant="body1" gutterBottom>
                  {tweet.text}
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
