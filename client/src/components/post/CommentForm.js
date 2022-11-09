import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";

//mui
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// redux
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  //   ...theme,
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottpm: "10px",
  },
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: "10px !important",
    marginBottom: "10px !important",

  },
});

function CommentForm(props) {
  const [body, setBody] = useState("");
  const { classes, authenticated } = props;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    }
    if (!props.UI.errors && !props.UI.loading) {
      setBody("");
    }
  }, [props.UI.errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.submitComment(props.postId, { body });
    setBody("");
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={(e) => {
            setErrors({});
            setBody(e.target.value);
          }}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  UI: state.UI,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
