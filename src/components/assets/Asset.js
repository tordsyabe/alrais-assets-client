import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect, useRef, useContext } from "react";
import { getAsset } from "../../services/AssetService";

import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";

import { useBarcode } from "@createnextapp/react-barcode";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
  },
}));

export default function Asset() {
  const componentRef = useRef();
  console.log("FROM ASSET");

  const { inputRef } = useBarcode({
    value: "Wait",
    options: {
      background: "#ffffff",
      height: 25,
      width: 1,
      fontSize: "15",
    },
  });

  const params = useParams();
  const classes = useStyles();

  const handlePrintBarcode = () => {
    console.log("Printed me");
  };

  useEffect(() => {
    getAsset(params.id).then((response) => console.log(response.data));
    console.log(params.id);
  }, []);

  return (
    <Paper square className={classes.root}>
      <div>ASSET</div>
      {/* <Grid container>
        <Grid item xs={12} sm={12} lg={8}>
          <Typography variant="h5">
            {manufacturer.name + " " + model.name + " " + model.modelNumber}
          </Typography>
          <br />
          <Typography>Serial No.: {serial}</Typography>
          <Typography>Asset Tag: {assetTag}</Typography>
          <Typography>Asset Name: {name}</Typography>
          <Typography>Asset ID: {uuid}</Typography>
          <Typography>Current Location: {location.name}</Typography>
          <Typography>Status: {status.name}</Typography>
          <br />
          <div ref={componentRef}>
            <svg ref={inputRef}></svg>
          </div>
          <br />
          <ReactToPrint
            trigger={() => (
              <Button
                onClick={handlePrintBarcode}
                variant="contained"
                size="small"
                color="primary"
              >
                Print Asset Tag
              </Button>
            )}
            content={() => componentRef.current}
          ></ReactToPrint>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <img width="100%" src={hpImage} alt={asset.name} />
        </Grid>
      </Grid> */}
    </Paper>
  );
}
