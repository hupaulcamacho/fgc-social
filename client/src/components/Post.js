import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeletePost from './DeletePost';

// MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// icons
import ChatIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// redux
import { connect } from "react-redux";
import { likePost, unlikePost } from "../redux/actions/dataActions";

const styles = (theme) => ({
  card: {
    postion: 'relative',
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});

function Post(props) {
  dayjs.extend(relativeTime);

  const likedPost = () => {
    if (props.user.likes && props.user.likes.find((like) => like.postId === props.post.postId)) {
      return true;
    } else return false;
  };

  const likePost = () => {
    console.log(props.post.postId)
    props.likePost(props.post.postId);
  };

  const unlikePost = () => {
    props.unlikePost(props.post.postId);
  };

  const {
    classes,
    post: {
      body,
      createdAt,
      userImage,
      userHandle,
      postId,
      likeCount,
      commentCount,
    },
    user: {
      authenticated,
      credentials: {
        handle
      }
    }
  } = props;

  const likeButton = !authenticated ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : (
    likedPost() ? (
      <MyButton tip="Unlike" onClick={unlikePost}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={likePost}>
        <FavoriteBorder color="primary" />
      </MyButton>
    )
  )

  const deleteButton = authenticated && userHandle === handle ? (
    <DeletePost postId={postId}/>
  ) : null
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile Image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {likeButton}
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  );
}

Post.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likePost,
  unlikePost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Post));
