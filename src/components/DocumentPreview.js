import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf/dist/umd/entry.webpack';
import { useParams } from 'react-router';
import { makeStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { getDocumentContent, getDocument } from '../api/backend';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  }));

export default function DocumentPreview() {
    const classes = useStyles();

    const { document_id } = useParams();
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        
        setNumPages(numPages);
    }

        
    const [documentContent, setDocumentContent] = useState(null);
    const [document, setDocument] = useState(null);
    
    async function fetchDocument() {
        try {
            const [documentContentResponse, documentResponse] = await Promise.all([getDocumentContent(document_id), getDocument(document_id)])
            console.log('Fetched data for document ', document_id);
            setDocumentContent({data: documentContentResponse.data});
            setDocument(documentResponse.data);
        } catch (error) {
            console.error("Failed to fetch document", document_id, error);
        }
        
    }

    useEffect(() => {
        fetchDocument();
    }, []);

    if (document === null || documentContent === null) {
        return <CircularProgress style={{ marginLeft: "50%", marginTop: "25%" }}></CircularProgress>;
    }

    console.log("Render document preview:", document)
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" component="h2">
                {document.file_name}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Document
                    file={documentContent}
                    onLoadSuccess={onDocumentLoadSuccess}
                    >
                    {Array.from(
                        new Array(numPages),
                        (el, index) => (<Page  key={`page_${index + 1}`} pageNumber={index + 1} size="A4" />),
                        )
                    }
                </Document>
            </Grid>
        </Grid>
    );
}
