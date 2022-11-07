import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Post from '../components/Post';
import Profile from '../components/Profile';

function Home () {
  const [ posts, setPosts] = useState(null)
  useEffect(() => {
    axios.get('/posts')
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => console.log(err));
  }, []) 
    
  let recentPostsMarkup = posts ? (
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
  
}

export default Home