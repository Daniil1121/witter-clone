import React, { ReactEventHandler, useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

interface IPropModal {
  open: boolean;
  handleClose: () => void;
}

const FormDialog: React.FC<IPropModal> = ({ open, handleClose }) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const changeUserNameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserName(e.target.value);
  };

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const login = (): void => {};

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
          <Button onClick={handleClose} color="primary" variant="contained">
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
