import React, { ReactEventHandler, useEffect, useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginUser } from "../../store/ducks/user/actionCreators";

import { selectUser } from "../../store/ducks/user/selectors";
import { useNavigate } from "react-router-dom";

interface IPropModal {
  open: boolean;
  handleClose: () => void;
}

const FormDialog: React.FC<IPropModal> = ({ open, handleClose }) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  const changeUserNameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserName(e.target.value);
  };

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const login = (): void => {
    dispatch(fetchLoginUser({ username: userName, password }));
  };

  const navigate = useNavigate();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <CloseIcon onClick={handleClose} />
          <Typography variant="h6">Войти в Твиттер</Typography>
          <TextField
            value={userName}
            onChange={changeUserNameHandler}
            autoFocus
            margin="dense"
            id="email"
            label="E-mail"
            type="email"
            fullWidth
          />
          <TextField
            value={password}
            onChange={changePasswordHandler}
            autoFocus
            margin="dense"
            id="password"
            label="password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={login} color="primary" variant="contained">
            Войти
          </Button>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
