import {
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Tweet } from "../Component/Tweet/Tweet";
import { SideMenu } from "../Component/SideMenu/SideMenu";
import { NewTweet } from "../Component/NewTweet/NewTweet";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "./../store/ducks/tweets/actionCreators/actionCreators";
import { selectLoadingState, selectTweetsItems } from "./../store/ducks/tweets/selectors";
import { LoadingState } from "../store/ducks/tweets/contracts/state";
import { RightMenu } from "./../Component/RightMenu/RightMenu";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { BigTweet } from "../Component/BigTweet/BigTweet";
import { selectUser } from "../store/ducks/user/selectors";
import { getMyProfile } from "../store/ducks/user/actionCreators";

export const Home: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();

  const tweets = useSelector(selectTweetsItems);
  const loadingStatus = useSelector(selectLoadingState);
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchTweets());
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("twitter-token");
    if (!token) {
      navigate("/login");
    } else if (token && !user) {
      dispatch(getMyProfile());
    }
  }, [user]);

  return (
    <Container>
      <Grid container>
        <Grid sx={{ paddingRight: "10px" }} xs={2.5} item>
          <SideMenu />
        </Grid>
        <Grid sx={{ border: "1px solid rgb(211, 211, 211)", borderBottom: "none" }} xs={6.5} item>
          <Routes>
            {["/home", "/home/search", "/"].map((path) => (
              <Route
                key="Home"
                path={path}
                element={
                  <>
                    <Box className="feed_header">
                      <Typography sx={{ display: "flex", alignItems: "center" }} variant="h5">
                        <IconButton onClick={() => navigate(-1)} sx={{ marginRight: "20px" }}>
                          <ArrowBack color="primary" />
                        </IconButton>
                        Главная
                      </Typography>
                    </Box>
                    <NewTweet />
                  </>
                }
              />
            ))}{" "}
            <Route
              key="Home" // optional: avoid full re-renders on route changes
              path={"/home/tweet"}
              element={
                <>
                  <Box className="feed_header">
                    <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton onClick={() => navigate(-1)} sx={{ marginRight: "20px" }}>
                        <ArrowBack color="primary" />
                      </IconButton>
                      Твитнуть
                    </Typography>
                  </Box>
                  <BigTweet />
                </>
              }
            />
          </Routes>

          {loadingStatus === LoadingState.LOADED && (
            <Box className="feed_body">
              <Routes>
                {["/", "/home"].map((path) => (
                  <Route
                    path={path}
                    element={
                      tweets &&
                      tweets.map((x) => (
                        <Tweet
                          createdAt={x.createdAt}
                          key={x._id}
                          _id={x._id}
                          user={x.user}
                          text={x.text}
                        />
                      ))
                    }
                  ></Route>
                ))}
              </Routes>
            </Box>
          )}
          {loadingStatus === LoadingState.LOADING && (
            <Box className="feed_body">
              <CircularProgress />
            </Box>
          )}
          {loadingStatus === LoadingState.ERROR && (
            <Box className="feed_body">не удалось загрузить контент...</Box>
          )}
        </Grid>
        <Grid className="form" xs={3} item>
          <RightMenu />
        </Grid>
      </Grid>
    </Container>
  );
};
