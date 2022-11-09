import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// mui
import MuiLink from "@mui/material/Link";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

// icon
import LocationOn from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import CalendarToday from "@mui/icons-material/CalendarToday";

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
    },
    "& .profile-image": {
      width: 150,
      height: 150,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      backgroundColor: "#f5f7ff",
      padding: "10px",
      borderRadius: "4px",
      marginBottom: "10px",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
  },
});

function StaticProfile(props) {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location },
  } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img className="profile-image" src={imageUrl} alt="profile" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </>
          )}
          {website && (
            <>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );
}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
