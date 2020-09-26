import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { getAsset } from "../../services/AssetService";

import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";

import { useBarcode } from "@createnextapp/react-barcode";

import hpImage from "../../images/hp.png";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
  },
}));

export default function Asset() {
  const [asset, setAsset] = useState({});
  const [model, setModel] = useState({});
  const [manufacturer, setManufacturer] = useState({});
  const [location, setLocation] = useState({});
  const [status, setStatus] = useState({});
  const [fetching, setFetching] = useState(false);

  const componentRef = useRef();

  const { inputRef } = useBarcode({
    value: asset.assetTag,
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
    setFetching(true);
    getAsset(params.id).then((response) => {
      setAsset(response.data);
      setFetching(false);
      console.log(response.data);
      setModel(response.data.modelResponse);
      setManufacturer(response.data.modelResponse.manufacturerResponse);
      setLocation(response.data.locationResponse);
      setStatus(response.data.statusResponse);
    });
  }, [params.id]);

  const { name, uuid, assetTag, serial } = asset;

  return (
    <Paper square className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={12} lg={8}>
          <Typography variant='h5'>
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
                variant='contained'
                size='small'
                color='primary'
              >
                Print Asset Tag
              </Button>
            )}
            content={() => componentRef.current}
          ></ReactToPrint>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <img width='100%' src={hpImage} alt={asset.name} />
        </Grid>
      </Grid>
    </Paper>
  );
}
