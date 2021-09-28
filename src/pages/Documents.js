import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


import { getDocuments, deleteDocument } from "../api/backend";

import DataTable from "../components/DataTable";
import UploadFile from "../components/UploadFile";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  grid: {
    height: '100%',
  }
}));

export default function Documents() {
  const columns = [
    { field: 'id',            headerName: 'ID',            hide: false, sortable: true,  flex: 1},
    { field: 'user_id',       headerName: 'User ID',       hide: true,  sortable: true,  },
    { field: 'file_name',     headerName: 'Document Name', hide: false, sortable: true,  flex: 4},
    { field: 'document_hash', headerName: 'SHA256',        hide: true,  sortable: true,  },
    { field: 'document_path', headerName: 'Path',          hide: true,  sortable: true,  },
    //{ field: 'view_button',   headerName: 'Action',         sortable: false, minWidth: 100},
  ];
  const defaultSort = [{field: 'id', sort: 'asc'}];
  const classes = useStyles();
  let history = useHistory();
  
  async function handleFileUploaded() {
    console.log("Handle file upload event");
  }

  async function loadData(dataField, order, filter, page, pageSize) {
      console.log("loadData", dataField, order, filter, page, pageSize)
      const response = await getDocuments(dataField, order);
      return response.data;
  }

  function onRowView(documentId) {
    if (documentId !== null && documentId !== undefined){
      history.push(`/document/preview/${documentId}`);
    }
  }
  async function onRowDelete(documentId) {
    if (documentId !== null && documentId !== undefined){
      await deleteDocument(documentId);
    }
  }

  return (
    <Grid container justify="space-between" alignItems="stretch" spacing={2} direction={"column"}>
      
      <Grid item xs={12}>
        <Typography variant="h1" component="h2">
          Documents
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <UploadFile onFileUploaded={handleFileUploaded}></UploadFile>
      </Grid>

      <Grid item xs={12} className={classes.grid}>
        <DataTable 
          style={{height: '100%'}} 
          columns={columns} 
          loadData={loadData} 
          defaultSort={defaultSort}
          onRowView={onRowView}
          onRowDelete={onRowDelete}
        ></DataTable>
      </Grid>
    </Grid>
  );
}
