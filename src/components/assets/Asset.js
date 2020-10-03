import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect, useRef, useContext } from "react";
import { getAsset } from "../../services/AssetService";

import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";

import { useBarcode } from "react-barcodes";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
  },
}));

export default function Asset() {
  const componentRef = useRef();

  const [asset, setAsset] = useState({});
  console.log("FROM ASSET");

  const { inputRef } = useBarcode({
    value: asset.assetTag,
    options: {
      background: "#ffffff",
      height: 40,
      width: 1,
      fontSize: "15",
      format: "CODE128A",
    },
  });

  const params = useParams();
  const classes = useStyles();

  const handlePrintBarcode = () => {
    console.log("Printed me");
  };

  useEffect(() => {
    getAsset(params.id).then((response) => setAsset(response.data));
    console.log(params.id);
  }, []);

  return (
    <Paper square className={classes.root}>
      <div>ASSET</div>
      <Grid container>
        <Grid item xs={12} sm={12} lg={8}>
          {/* <Typography variant="h5">
            {manufacturer.name + " " + model.name + " " + model.modelNumber}
          </Typography> */}
          <br />
          {/* <Typography>Serial No.: {serial}</Typography>
          <Typography>Asset Tag: {assetTag}</Typography>
          <Typography>Asset Name: {name}</Typography>
          <Typography>Asset ID: {uuid}</Typography>
          <Typography>Current Location: {location.name}</Typography>
          <Typography>Status: {status.name}</Typography> */}
          <br />
          <div
            ref={componentRef}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography style={{ color: "black" }}>Property of</Typography>
            <Typography style={{ color: "black" }}>
              ALRAIS ENT. GROUP
            </Typography>
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
          <img width="100%" src="" alt="" />
        </Grid>
      </Grid>
    </Paper>
  );
}
