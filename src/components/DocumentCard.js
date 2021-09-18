import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 280,
    maxWidth: 200,
  },
}));

export default function DocumentCard(props) {
  const classes = useStyles(); 
  let history = useHistory();

  async function handleClick(e) {
    e.preventDefault();
    console.log(`Push to "/document/preview/${props.document_id}"`)
    history.push(`/document/preview/${props.document_id}`);
  }

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Document"
          height="200"
          image="https://picsum.photos/200"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="h6" component="h2">
            {props.file_name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>     
  );
}
