import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { getDocument } from '../api/backend';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 280,
    maxWidth: 200,
  },
}));

export default function DocumentCard(props) {
  const classes = useStyles(); 
  // <Grid key={d.id} item>

  async function handleClick(e) {
    e.preventDefault();
    try {
        const response = await getDocument(props.document_id);
        console.log('Document ', props.document_id, ':', response.data);
    } catch (error) {
        console.error("Failed to fetch document", props.document_id, error);
    }
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
          <Typography gutterBottom variant="h5" component="h2">
            Document {props.document_id}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>     
  );
}
