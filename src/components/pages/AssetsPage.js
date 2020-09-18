import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Typography, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: "1em",
    margin: "1em auto",
  },
});

const AssetsPage = () => {
  const [assets, setAssets] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/assets")
      .then((response) => {
        setAssets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Fragment>
      <Typography variant='h4' m={5}>
        ASSETS PAGE
      </Typography>
      <Paper square className={classes.root}>
        {assets.map((asset) => (
          <div key={asset.uuid}>{asset.assetTag}</div>
        ))}
      </Paper>
    </Fragment>
  );
};

export default AssetsPage;
