import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {
  Paper,
  makeStyles,
  Typography,
  Button,
  Grid,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import FormikTextField from "../formik-material-ui/FormikTextField";

import { assetValidationSchema } from "./../../utils/ValidationSchema";
import { getLocations } from "../../services/LocationService";
import FormikSelectField from "../formik-material-ui/FormikSelectField";

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
}));

export default function AssetForm() {
  const classes = useStyles();

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations().then((response) => {
      setLocations(response.data);
    });
  }, []);

  return (
    <Paper square className={classes.root}>
      <Typography variant='h4'>CREATE ASSET</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={assetValidationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log(data);
          //asyn call

          setSubmitting(false);
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
            />

            <FormikTextField
              name='serial'
              variant='outlined'
              size='small'
              label='Serial'
              fullWidth
            />

            <FormikTextField
              name='name'
              variant='outlined'
              size='small'
              label='Asset Name'
              fullWidth
            />
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

            <FormikSelectField
              name='locationId'
              type='select'
              variant='outlined'
              label='Location'
              size='small'
              values={locations}
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
              disabled={!isValid || !dirty}
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
  );
}
