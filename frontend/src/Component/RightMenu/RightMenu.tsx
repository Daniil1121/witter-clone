import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  Grid,
  InputBase,
  List,
  ListItem,
  Typography,
} from "@mui/material";

import "./RightMenu.css";
import { selectTopicsItems } from "../../store/ducks/actualTopics/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopics } from "./../../store/ducks/actualTopics/actionCreators";
import { fetchAccounts } from "../../store/ducks/actualAccount/actionCreators";
import { selectAccountsItems } from "../../store/ducks/actualAccount/selectors";
import { Link } from "react-router-dom";

export const RightMenu: React.FC = (): React.ReactElement => {
  const dispath = useDispatch();

  const topics = useSelector(selectTopicsItems);
  const actualAccounts = useSelector(selectAccountsItems);

  useEffect(() => {
    dispath(fetchTopics());
    dispath(fetchAccounts());
  }, [dispath]);

  return (
    <>
      <Box className="input_right_bar">
        <SearchIcon />
        <InputBase
          className="search_input"
          placeholder="Поиск по твиттеру"
          fullWidth
        />
      </Box>
      <Box className="actual_topics">
        <List>
          <ListItem>
            <Typography variant="h6"> Актуальные темы</Typography>
          </ListItem>

          {topics.map((x) => (
            <Link to={`/home/search?q=${x.name}`}>
              <ListItem>
                <Typography variant="h6">{x.name}</Typography>
                <Typography>Твитов: {x.quantityCount}</Typography>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
      <Box className="actual_users">
        <List>
          <ListItem>
            <Typography variant="h6">Кого читать</Typography>
          </ListItem>

          {actualAccounts.map((x) => (
            <ListItem key={x.fullname}>
              <Grid container>
                <Grid item xs={2.5}>
                  <Avatar
                    sx={{ margin: "0 5px" }}
                    src={x.userAvatar}
                    alt={`аватар пользователься`}
                  />
                </Grid>

                <Grid item>
                  <Typography>
                    <b>{x.fullname}</b>
                  </Typography>
                  <Typography>@{x.name}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};
