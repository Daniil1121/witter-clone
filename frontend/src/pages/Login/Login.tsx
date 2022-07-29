import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SingInModal from "../../Component/Modal/ModalSingIn";
import SingUpModal from "../../Component/Modal/ModalSingUp";
// @ts-ignore
import classes from "./Login.module.css";

export const Login: React.FC = (): React.ReactElement => {
  const [singInOpen, setSingInOpen] = React.useState<boolean>(false);
  const [singUpOpen, setSingUpOpen] = React.useState<boolean>(false);

  const handleClickOpenSingIn = () => {
    setSingInOpen(true);
  };

  const handleClickOpenSingUp = () => {
    setSingUpOpen(true);
  };

  const handleClose = () => {
    setSingUpOpen(false);
    setSingInOpen(false);
  };

  return (
    <div className={classes.wrapper}>
      <section className={classes.blueSide}>
        <div className={classes.blueSideWrapper}>
          <TwitterIcon className={classes.blueSideWrapperBackground} />
          <ul className={classes.blueSideFeaturesItem}>
            <li>
              <Typography variant="h6">
                <SearchIcon fontSize="large" />
                Читайте о том, что вам интересно.
              </Typography>
            </li>
            <li>
              <Typography variant="h6">
                <PeopleOutlineIcon fontSize="large" />
                Узнайте, о чём говорят в мире.
              </Typography>
            </li>
            <li>
              <Typography variant="h6">
                <ChatBubbleOutlineIcon fontSize="large" />
                Присоединяйтесь к общению.
              </Typography>
            </li>
          </ul>
        </div>
      </section>
      <section className={classes.buttonSide}>
        <div className={classes.buttonSideWrapper}>
          <TwitterIcon className={classes.loginSideIcon} />
          <Typography variant="h4" className={classes.buttonSideTitle}>
            Узнайте, что происходит в мире прямо сейчас.
          </Typography>
          <Typography>Присоединяйтесь к Твиттеру прямо сейчас!</Typography>
          <Button
            onClick={handleClickOpenSingUp}
            className={classes.button}
            variant="contained"
            fullWidth
          >
            Зарегистрироваться
          </Button>
          <Button
            onClick={handleClickOpenSingIn}
            className={classes.button}
            variant="outlined"
            fullWidth
          >
            Войти
          </Button>
        </div>
      </section>
      <SingInModal handleClose={handleClose} open={singInOpen} />
      <SingUpModal handleClose={handleClose} open={singUpOpen} />
    </div>
  );
};
