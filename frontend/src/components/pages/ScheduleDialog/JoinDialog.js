import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";


export default function JoinDialog() {
  const [open, setOpen] = React.useState(false);
  const [emailValue, setEmailValue] = React.useState("");
  const [topicValue, setTopicValue] = React.useState("");

  const [count, setCount] = React.useState(0);

  const handleClickOpen = () => {
    console.log("Email : ",emailValue);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      

    

        <button className="button-2 bn37" onClick={handleClickOpen}>
          <i class="material-icons large icon-blue" >
            {" "}
            add_box
          </i>
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
            type="email"
            onChange={(e) => setTopicValue(e.target.value)}
            fullWidth
          />

            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Meeting Password"
            type="email"
            onChange={(e) => setEmailValue(e.target.value)}
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
