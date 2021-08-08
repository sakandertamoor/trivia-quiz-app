import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Model({
    open,
    handleClose,
    modelTitle,
    content,
    actions
}) {

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        aria-describedby="form-dialog-description"
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="form-dialog-title">{modelTitle}</DialogTitle>
        <DialogContent>
            {content}
        </DialogContent>
        <DialogActions>
            {actions}
        </DialogActions>
      </Dialog>
    </div>
  );
}
