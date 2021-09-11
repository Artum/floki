import React, { useRef, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';

import BackupIcon from '@material-ui/icons/Backup';

import { uploadDocument } from "../api/backend";


const useStyles = makeStyles((theme) => ({
  root: {
    
  },
}));

export default function UploadFile(props) {
    const classes = useStyles();
    
    const fileInput = useRef(null);

    const uploadProgressHandler = (event) => {
        console.log("Upload progress", event);
    }

    const changeHandler = (event) => {
        console.log("Upload handler", event);
        console.log("Files", event.target.files[0]);
        uploadDocument(event.target.files[0], uploadProgressHandler);
        props.onFileUploaded();
    };
    const buttonClickHandler = (event) => {
    console.log("Button Click handler", event);
        fileInput.current.click();
    };

    return (
        <Fragment>
            <Button onClick={buttonClickHandler} className={classes.root}>
                <BackupIcon color="primary" fontSize="large"></BackupIcon>
            </Button>
            <input id="document-upload-input"
            type="file"
            ref={fileInput}
            style={{display: 'none'}}
            onChange={changeHandler}
            />
        </Fragment>
    );
}
