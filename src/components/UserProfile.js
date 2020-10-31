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
    display: "flex",
    justifyContent: "center",
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    width: "100%",
    maxWidth: theme.spacing(125),
  },
  card: {
    width: "100%",
  },
  media: {
    height: 200,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: "auto",
  },
  centered: {
    margin: "auto",
  },
  loader: "flex",
  "& > * + *": {
    marginLeft: theme.spacing(2),
  },
}));

export default function UserProfile() {
  const userProfile = useSelector((state) => state.userAuthentication.userProfile);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
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
    </div>
  );
}
