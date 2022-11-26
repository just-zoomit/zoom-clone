import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useNavigate } from "react-router-dom";

export default function JoinDialog() {
  const [open, setOpen] = React.useState(false);

  const id = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (id.current && password.current) {
      console.log("id: ", id.current.value);
      setOpen(false);
      console.log("password: ", password.current.value);
      navigate(`/msdk/?mn=${id.current.value}&pw=${password.current.value}`);
    }
  };

  return (
    <div>
      <button className="button-2 bn37" onClick={handleClickOpen}>
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
          <Button onClick={handleClose} color="primary">
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
