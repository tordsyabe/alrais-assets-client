import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  DialogContext,
  LocationDialogContext,
} from "../../contexts/LocationDialogContext";
import FormikTextField from "../formik-material-ui/FormikTextField";
import { Field, Form, Formik } from "formik";
import { locationValidationSchema } from "../../utils/ValidationSchema";
import { makeStyles } from "@material-ui/core";
import { addLocation } from "../../services/LocationService";
import { LocationContext } from "../../contexts/LocationContext";
import { locationActionType } from "../../utils/constants";

const initialValues = {
  name: "",
  address: "",
  city: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function LocationFormDialog({ title, dialogContent, uuid }) {
  const { handleCloseLocationForm, open } = useContext(LocationDialogContext);
  const { dispatch } = useContext(LocationContext);

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseLocationForm}
        aria-labelledby='form-dialog-title'
        className={classes.root}
      >
        <Formik
          initialValues={{ ...initialValues, uuid: uuid }}
          validationSchema={locationValidationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            addLocation(data).then((response) => {
              dispatch({
                type: locationActionType.ADD_LOCATION,
                payload: response.data,
              });
              handleCloseLocationForm();
              setSubmitting(false);
            });
          }}
        >
          {({ value, isSubmitting, dirty, isValid }) => (
            <Form>
              <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
              <DialogContent>
                <DialogContentText>{dialogContent}</DialogContentText>
                <Field type='hidden' name='uuid' />

                <FormikTextField
                  name='name'
                  label='Name'
                  variant='outlined'
                  size='small'
                  fullWidth
                  required
                />

                <FormikTextField
                  name='address'
                  label='Address'
                  variant='outlined'
                  size='small'
                  fullWidth
                  required
                />

                <FormikTextField
                  name='city'
                  label='City'
                  variant='outlined'
                  size='small'
                  fullWidth
                  required
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseLocationForm}
                  color='secondary'
                  variant='contained'
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
