import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "1000",
  },
  media: {
    height: 200,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: "auto",
  },
  details: {
    margin: "auto",
    marginLeft: 5,
  },
}));

export default function UserProfile() {
  const userProfile = useSelector((state) => state.userAuthentication.userProfile);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image="https://picsum.photos/1000" />
      <Avatar alt={userProfile.fullName} src={userProfile.imageUrl} className={classes.avatar} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" align="center">
          {userProfile.fullName}
        </Typography>
        <Typography gutterBottom variant="h6" align="center">
          {userProfile.email}
        </Typography>
      </CardContent>
    </Card>
  );
}
