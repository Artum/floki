import * as React from 'react';

import { DataGrid } from '@mui/x-data-grid';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const initialPositionState = {
  mouseX: null,
  mouseY: null,
};

function getDocumentIdFromPosition(xPosition, yPosition) {
    const elements = document.elementsFromPoint(xPosition, yPosition);
    const rowElements = elements.filter(el => el.className === "MuiDataGrid-row")
    if (rowElements.length === 1) {
      return rowElements[0].dataset.id;
    }
    return null;
}

export default function DataTable(props) {
    const {loadData, columns, defaultSort, onRowView, onRowDelete} = props;

  const [sortModel, setSortModel] = React.useState(defaultSort);
  const [loading, setLoading] = React.useState(true);
  const [sizePerPage, setSizePerPage] = React.useState(25);
  const [data, setData] = React.useState([]);


  const [positionState, setPositionState] = React.useState(initialPositionState);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setPositionState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setPositionState(initialPositionState);
  };
  const handleView = (e) => {
    const documentId = getDocumentIdFromPosition(positionState.mouseX, positionState.mouseY);
    if (documentId !== null) {
      onRowView(documentId);
    }
    handleClose();
  };
  const handleDelete = (e) => {
    const documentId = getDocumentIdFromPosition(positionState.mouseX, positionState.mouseY);
    if (documentId !== null) {
      onRowDelete(documentId);
    }
    handleClose();
  };


  const onFilterModelChange = (model, details) => {
    console.log("onFilterModelChange", model, details);
  }
  const onPageSizeChange = (pageSize, details) => {
    console.log("onPageSizeChange", pageSize, details);
    setSizePerPage(pageSize);
  }
  const onError = (args, details) => {
    console.log("onError", args, details);
  }
  const onSelectionModelChange = (selectionModel, details) => {
    console.log("onSelectionModelChange", selectionModel, details);
  }
  const onSortModelChange = (model, details) => {
    console.log("onSortModelChange", model, details);
    setSortModel(model);
  }
  

  React.useEffect(() => {
    async function doEffect() {
      setData([]);
      setLoading(true);
      const {field, sort} = (sortModel.length > 0) ? sortModel[0] : defaultSort[0];
      const newData = await loadData(field, sort, null, null, null);
      setData(newData);
      setLoading(false);
    }
    doEffect();
  }, [sortModel, defaultSort]);
  


  console.log("DataTable called: props=", props);
  return (
    <div style={{height: '75vh', width: '100%', cursor: 'context-menu'}} onContextMenu={handleContextMenu}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={sizePerPage}
            rowsPerPageOptions={[2,5,10,25,50]}
            disableSelectionOnClick
            filterMode="server"
            sortingMode="server"
            sortModel={sortModel}
            loading={loading}
            onFilterModelChange={onFilterModelChange}
            onPageSizeChange={onPageSizeChange}
            onError={onError}
            onSelectionModelChange={onSelectionModelChange}
            onSortModelChange={onSortModelChange}     
          />
      <Menu
        keepMounted
        open={positionState.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          positionState.mouseY !== null && positionState.mouseX !== null
            ? { top: positionState.mouseY, left: positionState.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleView}>View</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      
    </div>
  );
}
