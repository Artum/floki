import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


import { getDocuments } from "../api/backend";

import DocumentCard from "./DocumentCard"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: "start",
    justifyContent: "start",
  },
  content: {
  },
  paper: {
    height: 280,
    width: 200,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    async function fetchDocuments() {
      const response = await getDocuments();
      setDocuments(response.data);
    }

    fetchDocuments();
  }, []);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Typography variant="h1" component="h2" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid item xs={12}>
        <Grid container justifycontent="left" spacing={4}>
          {documents.map((d) => (
            <Grid key={d.id} item>
              <DocumentCard document_id={d.id}></DocumentCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
