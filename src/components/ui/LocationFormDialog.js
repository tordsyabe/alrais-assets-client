import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContext } from "../../contexts/DialogContext";
import FormikTextField from "../formik-material-ui/FormikTextField";
import { Field, Form, Formik } from "formik";
import { locationValidationSchema } from "../../utils/ValidationSchema";
import { makeStyles } from "@material-ui/core";
import { addLocation } from "../../services/LocationService";

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
  const { handleDialogClose, open } = useContext(DialogContext);

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby='form-dialog-title'
        className={classes.root}
      >
        <Formik
          initialValues={{ ...initialValues, uuid: uuid }}
          validationSchema={locationValidationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            addLocation(data).then(() => {
              handleDialogClose();
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
                  onClick={handleDialogClose}
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
