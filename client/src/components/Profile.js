import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from './EditDetails'
import MyButton from '../util/MyButton';

//redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";

// mui
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

// icons
import LocationOn from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import CalendarToday from "@mui/icons-material/CalendarToday";
import KeyboardReturn from "@mui/icons-material/KeyboardReturn";

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "5%",
      },
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
      backgroundColor: '#f5f7ff',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '10px',
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
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});

function Profile(props) {
  const {
    classes,
    user: {
      credentials: { handle, createdAt, imageUrl, bio, website, location },
      loading,
      authenticated,
    },
  } = props;

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    // send to server
    const formData = new FormData();
    formData.append("image", image, image.name);
    props.uploadImage(formData);
    console.log('image changed')
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleLogout = () => {
    props.logoutUser()
  }

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <MyButton tip="Edit profile picture" onClick={handleEditPicture} btnClassName="button">
              <EditIcon color="primary" />
            </MyButton>
            <img className="profile-image" src={imageUrl} alt="profile" />
            <input
              type="file"
              id="imageInput"
              onChange={handleImageChange}
              hidden="hidden"
            />
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
          <MyButton tip="Logout" onClick={handleLogout} >
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login.
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>loading...</p>
  );

  return profileMarkup;
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
