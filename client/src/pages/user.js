import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Post from "../components/post/Post";
import StaticProfile from "../components/profile/StaticProfile";
import { useParams } from 'react-router-dom';
// mui
import Grid from "@mui/material/Grid";

// redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

function User(props) {
  const [ profile, setProfile ] = useState(null);
  const [ postIdParam, setPostIdParam ] = useState(null);

  const { handle } = useParams();
  const { postId } = useParams();

  

  useEffect(() => {
    if(postId) {
      setPostIdParam(postId)
    }

    props.getUserData(handle);

    axios.get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);
  
  const { posts, loading } = props.data;
  let postsMarkup = loading ? (
    <p>Loading...</p>
  ) : posts === null ? (
    <p>No posts from this user...</p>
  ) : !postIdParam ? (
    posts.map((post) => <Post key={post.postId} post={post} />)
  ) : (
    posts.map(post => {
      if(post.postId !== postIdParam) {
        return <Post key={post.postId} post={post} />
      } else return <Post key={post.postId} post={post} openDialog />
    })
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {postsMarkup}
      </Grid>
      <Grid item sm={3} xs={12}>
        {profile === null ? (
          <p>Loading Profile...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);
