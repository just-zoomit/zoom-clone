import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useNavigate } from "react-router-dom";

import styles from '../Home/Button.module.css';

export default function JoinDialog() {
  const [open, setOpen] = React.useState(false);

  const id = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    if (id.current.value === "" || password.current.value === "") {
      alert("Please enter a valid meeting ID and password");
    } else {
      setOpen(false);
      navigate(`/msdk/?mn=${id.current.value}&pw=${password.current.value}`);
    }
  };

  return (
    <div>
   
      <button  className={`${styles.buttonBlue} ${styles.bn37}`}  onClick={handleClickOpen}>
        <i class="material-icons large icon-blue"> add_box</i>
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Join Meeting</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Meeting Number"
            type="meetingNumber"
            required={true}
            inputRef={id}
            // onChange={(e) => setMeetingNumber(e.target.value)}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Meeting Password"
            type="password"
            inputRef={password}
            required={true}
            // onChange={(e) => setMeetingPassword(e.target.value)}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
