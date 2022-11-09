import React, { Fragment } from "react";
import NoImg from "../images/null_user.png";
import PropTypes from "prop-types";

import withStyles from "@mui/styles/withStyles";
import { Paper } from "@mui/material";

import LocationOn from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import CalendarToday from "@mui/icons-material/CalendarToday";

const styles = (theme) => ({
    paper: {
        // display: "flex",
        marginBottom: 20,
    },
  imageWrapper: {
    textAlign: "center",
    position: "relative",
  },
  profileDetails: {
    width: "90%",
    flexDirection: "column",
    padding: 25,
  },
  profileImage: {
    width: 150,
    padding: '15px auto 10px auto',
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: "0 auto 7px auto",
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
  fullLine: {
    height: 15,
    width: "90%",
    textAlign: "center",
    position: "relative",
    backgroundColor: "rgba(0,0,0, 0.6)",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    width: "70%",
    backgroundColor: "rgba(0,0,0, 0.2)",
    marginBottom: 10,
    marginRight: 15,
    float:'right'
  },
});

function ProfileSkeleton(props) {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.imageWrapper}>
        <img src={NoImg} alt="profile" className={classes.profileImage} />
      </div>
      <hr />
      <div className={classes.profileDetails}>
        <div className={classes.handle} />
        <hr />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <hr />
        <LocationOn color="primary" /> <div className={classes.halfLine}></div> 
        <hr />
        <LinkIcon color="primary" /> <div className={classes.halfLine}></div>
        <hr />
        <CalendarToday color="primary" /> <div className={classes.halfLine}></div> 
      </div>
    </Paper>
  );
}

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
