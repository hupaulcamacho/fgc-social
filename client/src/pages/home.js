import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// components
import Post from '../components/Post';
import Profile from '../components/Profile';

// mui
import Grid from '@mui/material/Grid';

// redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

function Home (props) {
  useEffect(() => {
    props.getPosts()
  }, []) 
  
  const { posts, loading } = props.data
  // console.log(posts)
  let recentPostsMarkup = !loading ? (
      posts.map((post) => <Post key={post.postId} post={post} />) 
    ) : <p>Loading...</p>
  
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentPostsMarkup} 
      </Grid>
      <Grid item sm={3} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  )
  
};

Home.propTypes ={
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getPosts })(Home)