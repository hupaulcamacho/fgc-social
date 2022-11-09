import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import Comments from "./Comments"
import CommentForm from "./CommentForm"

// mui
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// icons
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/ChatBubbleOutline";
import UnfoldMore from "@mui/icons-material/UnfoldMore";

// redux
import { connect } from "react-redux";
import { getPost } from "../../redux/actions/dataActions";

const styles = (theme) => ({
//   ...theme,
  invisibleSeparator: {
    border: "none",
    margin: "4",
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottpm: '10px'
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
    // top: '10%',
    margin: 2
  },
  expandButton: {
    position: 'absolute !important',
    left: '59%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
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
      comments
    },
    UI: { loading },
  } = props;

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2}/>
    </div>
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
        <LikeButton postId={postId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} Comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm postId={postId} />
      <Comments comments={comments}/>
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
