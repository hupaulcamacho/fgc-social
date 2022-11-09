import React from "react";
import MyButton from "../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// icons
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// redux
import { connect } from "react-redux";
import { likePost, unlikePost } from "../redux/actions/dataActions";

function LikeButton(props) {
  const likedPost = () => {
    if (
      props.user.likes &&
      props.user.likes.find((like) => like.postId === props.postId)
    ) {
      return true;
    } else return false;
  };

  const likePost = () => {
    console.log(props.postId);
    props.likePost(props.postId);
  };

  const unlikePost = () => {
    props.unlikePost(props.postId);
  };
  const { authenticated } = props.user;

  const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
            <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
  ) : likedPost() ? (
    <MyButton tip="Unlike" onClick={unlikePost}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likePost}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
  return likeButton;
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  likePost,
  unlikePost,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
