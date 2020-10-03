import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { authorize } from "../redux/actions";

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
  centered: {
    margin: "auto",
  },
}));

export default function UserProfile() {
  const userProfile = useSelector((state) => state.userAuthentication.userProfile);
  const isAuthorized = useSelector((state) => state.userAuthentication.isAuthorized);
  const dispatch = useDispatch();
  const classes = useStyles();

  const onAuthorize = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth
      .grantOfflineAccess({
        scope: "profile email openid https://www.googleapis.com/auth/gmail.readonly",
      })
      .then((authResponse) => {
        dispatch(authorize(authResponse.code));
      });
  };

  const onRevokeAuthorize = () => {
    console.log("onRevokeAuthorize");
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image="https://picsum.photos/1000" />
      <Avatar alt={userProfile.fullName} src={userProfile.imageUrl} className={classes.avatar} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" align="center">
          {userProfile.fullName}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h6" align="center">
              {userProfile.email}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {isAuthorized ? (
              <Button color="secondary" variant="contained" onClick={onRevokeAuthorize}>
                Disable Email Access
              </Button>
            ) : (
              <Button color="primary" variant="contained" onClick={onAuthorize}>
                Enable Email Access
              </Button>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
