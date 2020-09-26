import React, { useState, useEffect, useContext, Fragment } from "react";
import { Formik, Form } from "formik";
import {
  Paper,
  makeStyles,
  Typography,
  Button,
  Grid,
  Hidden,
} from "@material-ui/core";

import FormikTextField from "../formik-material-ui/FormikTextField";
import FormikSelectField from "../formik-material-ui/FormikSelectField";

import { assetValidationSchema } from "./../../utils/ValidationSchema";
import { getStatus } from "../../services/StatusService";
import { addAsset } from "../../services/AssetService";
import { useHistory } from "react-router-dom";
import { ModelContext } from "../../contexts/ModelContext";
import { LocationDialogContext } from "../../contexts/LocationDialogContext";
import LocationFormDialog from "../ui/LocationFormDialog";
import { LocationContext } from "../../contexts/LocationContext";
import { StatusDialogContext } from "../../contexts/StatusDialogContext";
import StatusFormDialog from "../ui/StatusFormDialog";
import { StatusContext } from "../../contexts/StatusContext";

const initialValues = {
  name: "",
  assetTag: "",
  serial: "",
  purchaseDate: new Date().toISOString().split("T")[0],
  purchaseNumber: "",
  purchaseCost: "",
  warranty: "",
  notes: "",
  locationId: "",
  statusId: "",
  modelId: "",
  image: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
    "& form": {
      marginTop: theme.spacing(3),
    },
    "& .MuiFormControl-root": {
      marginTop: theme.spacing(3),
    },
  },

  inline: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiButtonBase-root": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function AssetForm() {
  const classes = useStyles();

  const { models } = useContext(ModelContext);
  const { locations } = useContext(LocationContext);
  const { status } = useContext(StatusContext);

  const { handleOpenLocationForm } = useContext(LocationDialogContext);
  const { handleOpenStatusForm } = useContext(StatusDialogContext);

  const history = useHistory();

  return (
    <Fragment>
      <Paper square className={classes.root}>
        <Typography variant='h4'>CREATE ASSET</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={assetValidationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            addAsset(data)
              .then((response) => {
                setSubmitting(false);
                alert("Asset added successfully\n");
                history.push("/assets");
              })
              .catch((error) => {
                alert(error);
                setSubmitting(false);
              });
          }}
        >
          {({ values, isSubmitting, dirty, isValid }) => (
            <Form>
              <FormikTextField
                name='assetTag'
                label='Asset Tag'
                variant='outlined'
                size='small'
                fullWidth
                required
              />
              <FormikTextField
                name='serial'
                variant='outlined'
                size='small'
                label='Serial'
                fullWidth
                required
              />
              <FormikTextField
                name='name'
                variant='outlined'
                size='small'
                label='Asset Name'
                fullWidth
                required
              />
              <Hidden xsUp>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4}>
                    <FormikTextField
                      name='purchaseDate'
                      variant='outlined'
                      label='Purchase Date'
                      type='date'
                      size='small'
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <FormikTextField
                      name='purchaseNumber'
                      variant='outlined'
                      size='small'
                      label='Purchase Number'
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <FormikTextField
                      name='purchaseCost'
                      type='text'
                      variant='outlined'
                      size='small'
                      label='Purchase Cost'
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <FormikTextField
                  name='warranty'
                  type='text'
                  variant='outlined'
                  size='small'
                  label='Warranty (months)'
                  fullWidth
                />
              </Hidden>
              <Grid container className={classes.inline} spacing={3}>
                <Grid item xs={10}>
                  <FormikSelectField
                    name='locationId'
                    type='select'
                    variant='outlined'
                    label='Default Location'
                    size='small'
                    values={locations}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleOpenLocationForm}
                  >
                    New
                  </Button>
                </Grid>
              </Grid>

              <Grid container className={classes.inline} spacing={3}>
                <Grid item xs={10}>
                  <FormikSelectField
                    name='statusId'
                    type='select'
                    variant='outlined'
                    label='Status'
                    size='small'
                    values={status}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleOpenStatusForm}
                  >
                    New
                  </Button>
                </Grid>
              </Grid>

              <FormikSelectField
                name='modelId'
                type='select'
                variant='outlined'
                label='Model'
                size='small'
                values={models}
                fullWidth
              />
              <FormikTextField
                name='notes'
                type='text'
                variant='outlined'
                size='small'
                label='Notes'
                fullWidth
              />
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <Button
                disabled={!isValid || !dirty || isSubmitting}
                type='submit'
                color='secondary'
                variant='contained'
              >
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
      <LocationFormDialog
        title='Location'
        dialogContent='Create new location'
        uuid={null}
      />

      <StatusFormDialog
        title='Status'
        dialogContent='Create new status'
        uuid={null}
      />
    </Fragment>
  );
}
