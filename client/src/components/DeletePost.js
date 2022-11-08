import React, { useState, Fragment } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

// mui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

import { connect } from "react-redux";
import { deletePost } from "../redux/actions/dataActions";

const styles = {
    deleteButton: {
        position: "absolute !important",
        left: '59%',
    }
};

function DeletePost(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePost = () => {
    props.deletePost(props.postId);
    setOpen(false);
  };

  const { classes } = props;
  return (
    <Fragment>
      <MyButton
        tip="Delete Post"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="delete" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deletePost} color="delete">
            Delete Post
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(null, { deletePost })(withStyles(styles)(DeletePost));
