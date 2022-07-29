import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

interface IPropModal {
  open: boolean;
  handleClose: () => void;
}

const FormDialog: React.FC<IPropModal> = ({ open, handleClose }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <CloseIcon onClick={handleClose} />
          <Typography variant="h6">Зарегистрироваться в Твиттер</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="Имя"
            label="Имя"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="E-mail"
            type="email"
            fullWidth
          />
          <TextField
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
            Зарегистрироваться
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
