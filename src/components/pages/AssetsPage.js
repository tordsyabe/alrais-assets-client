import React, { useState, useEffect, Fragment } from "react";
import { Typography, Paper, makeStyles, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getAssets } from "../../services/AssetService";

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
    getAssets().then((response) => {
      setAssets(response.data);
    });
  }, []);

  return (
    <Fragment>
      <Paper square className={classes.root}>
        <Grid container>
          <Grid item className={classes.something}>
            <Typography variant="h4" m={5}>
              ASSET LISTS
            </Typography>
          </Grid>
          <Grid item>
            <Link to="/assets/new">
              <Button color="primary" variant="contained">
                Add new asset
              </Button>
            </Link>
          </Grid>
        </Grid>

        {assets.map((asset) => (
          <div key={asset.uuid}>
            <Link to={`/assets/${asset.uuid}`}>
              <Typography variant="h5">{asset.modelResponse.name}</Typography>
            </Link>
          </div>
        ))}
      </Paper>
    </Fragment>
  );
};

export default AssetsPage;
