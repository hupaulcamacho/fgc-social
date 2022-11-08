import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MyButton from '../util/MyButton';

// mui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { withStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";

// redux
import { connect } from "react-redux";
import { createPost, clearErrors } from "../redux/actions/dataActions";

// icon
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';


const styles = (theme) => ({
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: '10px !important'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        width: '40px',
        left: '68%',
        top: '6%'
    },
    textField: {
        marginTop: '10px !important'
    }
})

function CreatePost(props) {
    const [open, setOpen] = useState(false);
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(props.UI.errors) {
            setErrors(props.UI.errors);
        }
        if(!props.UI.errors && !props.UI.loading) {
            setBody('');
            handleClose();    
        }
    }, [props.UI.errors]);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        props.clearErrors()
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        setOpen(false);
        props.createPost({ body })
    }

    const { classes, UI: { loading } } = props;
    return (
        <>
            <MyButton tip="New post" onClick={handleOpen}>
                <AddIcon color="primary" />
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    Make a new post
                    <MyButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            name="body" 
                            type="text" 
                            label="Post" 
                            multiline 
                            rows="3" 
                            placeholder="What do you want to say?"
                            error={errors.body? true : false}
                            helperText={errors.body}
                            className={classes.textField}
                            onChange={(e) => setBody(e.target.value)}
                            fullWidth 
                        />
                        <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                            Post
                            {loading && (
                                <CircularProgress size={30} className={classes.progressSpinner} />
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { createPost, clearErrors })(withStyles(styles)(CreatePost))