import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Snackbar,
  TextareaAutosize,
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import "./NewTweet.css";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { addNewTweet } from "../../store/ducks/tweets/actionCreators/actionCreators";
import { selectAddingNewTweetState } from "../../store/ducks/tweets/selectors";
import { AddingTweetState } from "./../../store/ducks/tweets/contracts/state";

export const NewTweet: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const AddingNewPostState: string = useSelector(selectAddingNewTweetState);

  const [tweetText, setTweetText] = useState<string>("");
  const [open, setOpen] = React.useState(false);

  const inputHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetText(event.target.value);
  };

  const addNewTweetHandler = (): void => {
    setTweetText("");
    dispatch(addNewTweet(tweetText));
  };

  useEffect(() => {
    if (AddingNewPostState === AddingTweetState.ERROR) {
      setOpen(true);
    }
  }, [AddingNewPostState]);

  return (
    <Grid
      sx={{
        padding: "10px 0",
        minHeight: "100px",
        borderBottom: "1px solid rgb(243, 243, 243)",
      }}
      container
    >
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => {
          setOpen(false);
        }}
        autoHideDuration={2000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Ошибка при добавлении твита :(
        </Alert>
      </Snackbar>
      <Grid item xs={1}>
        <Avatar
          sx={{ margin: "0 5px" }}
          src="https://banner2.cleanpng.com/20180430/jge/kisspng-computer-icons-font-awesome-hamburger-button-5ae723a4ebfc72.3953800615250973809666.jpg"
          alt={`аватар пользователься`}
        />
      </Grid>
      <Grid item xs={11}>
        <Grid item xs={12}>
          <TextareaAutosize
            minRows={3}
            className="tweet_input"
            placeholder="Что происходит?"
            value={tweetText}
            onChange={inputHandler}
            maxLength={280}
          />
        </Grid>
        <Grid className="new_tweet_management" item xs={12}>
          <Box>
            <IconButton>
              <ImageOutlinedIcon color="primary" />
            </IconButton>
            <IconButton>
              <SentimentSatisfiedAltOutlinedIcon color="primary" />
            </IconButton>
          </Box>
          <Box>
            <span className="new_tweet_length">{280 - tweetText.length}</span>
            <CircularProgress
              className="new_tweet_circular_progress grey"
              variant="determinate"
              value={100}
              sx={{ color: grey[400] }}
            />
            <CircularProgress
              className={`new_tweet_circular_progress ${
                tweetText.length >= 240 && tweetText.length <= 270 && "orange"
              } ${tweetText.length >= 270 && "red"}`}
              variant="determinate"
              value={tweetText.length / 2.8}
            />

            <Button
              disabled={AddingNewPostState === AddingTweetState.LOADING}
              onClick={addNewTweetHandler}
              sx={{ margin: "5px" }}
              variant="contained"
            >
              Твитнуть
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
