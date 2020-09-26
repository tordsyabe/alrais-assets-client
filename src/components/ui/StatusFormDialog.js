import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { StatusDialogContext } from "../../contexts/StatusDialogContext";
import FormikTextField from "../formik-material-ui/FormikTextField";
import { Field, Form, Formik } from "formik";
import { statusValidationSchema } from "../../utils/ValidationSchema";
import { makeStyles } from "@material-ui/core";
import { addLocation } from "../../services/LocationService";
import { LocationContext } from "../../contexts/LocationContext";
import { locationActionType, statusActionType } from "../../utils/constants";
import { addStatus } from "../../services/StatusService";
import { StatusContext } from "../../contexts/StatusContext";

const initialValues = {
  name: "",
  type: "",
  notes: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function StatusFormDialog({ title, dialogContent, uuid }) {
  const { handleCloseStatusForm, open } = useContext(StatusDialogContext);
  const { dispatch } = useContext(StatusContext);

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseStatusForm}
        aria-labelledby='form-dialog-title'
        className={classes.root}
      >
        <Formik
          initialValues={{ ...initialValues, uuid: uuid }}
          validationSchema={statusValidationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            addStatus(data).then((response) => {
              dispatch({
                type: statusActionType.ADD_STATUS,
                payload: response.data,
              });
              handleCloseStatusForm();
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
                  name='type'
                  label='Type'
                  variant='outlined'
                  size='small'
                  fullWidth
                  required
                />

                <FormikTextField
                  name='notes'
                  label='Notes'
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseStatusForm}
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
