import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import { withStyles } from "@mui/styles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// mui
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// icons
import CloseIcon from "@mui/icons-material/Close";
import UnfoldMore from "@mui/icons-material/UnfoldMore";

// redux
import { connect } from "react-redux";
import { getPost } from "../redux/actions/dataActions";

const styles = (theme) => ({
//   ...theme,
  invisibleSeparator: {
    border: "none",
    margin: "4",
  },
  profileImage: {
    maxWidth: 150,
    height: 150,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 10
  },
  closeButton: {
    position: 'absolute !important',
    left: '93%',
    margin: 2
  }
});

function PostDialog(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    props.getPost(props.postId);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    classes,
    post: {
      postId,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      userHandle,
    },
    UI: { loading },
  } = props;

  const dialogMarkup = loading ? (
    <CircularProgress size={200} />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item xs={6}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1" color="textSecondary">
          {body}
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip="Expand Post"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
}

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.data.post,
  UI: state.UI,
});

const mapActionsToProps = {
  getPost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostDialog));
