import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Paper,
  makeStyles,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import FormikTextField from "../formik-material-ui/FormikTextField";

import { assetValidationSchema } from "./../../utils/ValidationSchema";

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
            />

            <FormikTextField
              name='purchaseDate'
              variant='outlined'
              label='Purchase Date'
              type='date'
              size='small'
              fullWidth
            />
            <FormikTextField
              name='purchaseNumber'
              variant='outlined'
              size='small'
              label='Purchase Number'
              fullWidth
            />

            <FormikTextField
              name='purchaseCost'
              type='text'
              variant='outlined'
              size='small'
              label='Purchase Cost'
              fullWidth
            />

            <FormikTextField
              name='warranty'
              type='text'
              variant='outlined'
              size='small'
              label='Warranty (months)'
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
              disabled={!dirty || !isValid}
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
