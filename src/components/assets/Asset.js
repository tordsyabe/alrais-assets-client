import { makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getAsset } from "../../services/AssetService";

import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
  },
}));

export default function Asset() {
  const [asset, setAsset] = useState({});
  const [fetching, setFetching] = useState(false);

  const params = useParams();
  const classes = useStyles();

  useEffect(() => {
    setFetching(true);
    getAsset(params.id).then((response) => {
      setAsset(response.data);
      setFetching(false);
    });
  }, [params.id]);

  const { name, uuid } = asset;

  return (
    <Paper square className={classes.root}>
      <Typography variant='h4'>{name}</Typography>
    </Paper>
  );
}
