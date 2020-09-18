import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Typography, Paper, makeStyles, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
    "& .MuiTypography-root": {
      marginBottom: theme.spacing(3),
    },
  },
  something: {
    flexGrow: 1,
  },
}));

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
      <Paper square className={classes.root}>
        <Grid container>
          <Grid item className={classes.something}>
            <Typography variant='h4' m={5}>
              ASSET LISTS
            </Typography>
          </Grid>
          <Grid item>
            <Link to='/assets/new'>
              <Button color='primary' variant='contained'>
                Add new asset
              </Button>
            </Link>
          </Grid>
        </Grid>

        {assets.map((asset) => (
          <div key={asset.uuid}>{asset.assetTag}</div>
        ))}
      </Paper>
    </Fragment>
  );
};

export default AssetsPage;
