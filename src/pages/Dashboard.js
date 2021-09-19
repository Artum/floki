import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


import { getDocuments } from "../api/backend";

import DocumentCard from "../components/DocumentCard"
import UploadFile from "../components/UploadFile"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: "start",
    justifyContent: "start",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  
  const [documents, setDocuments] = useState([]);
  
  async function fetchDocuments() {
    const response = await getDocuments();
    setDocuments(response.data);
  }

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function handleFileUploaded() {
    console.log("Handle file upload event");
    await fetchDocuments();
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      
      <Grid item xs={12}>
        <Typography variant="h1" component="h2">
          Dashboard
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <UploadFile onFileUploaded={handleFileUploaded}></UploadFile>
      </Grid>
      
      <Grid item xs={12}>
        <Grid container justifycontent="left" spacing={4}>
          {documents.map((d) => (
            <Grid key={d.id} item>
              <DocumentCard document_id={d.id} file_name={d.file_name}></DocumentCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
      
    </Grid>
  );
}
