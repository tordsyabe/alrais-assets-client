import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

export default function FormikTextField({
  label,
  variant,
  size,
  fullWidth,
  required,
  type = "input",

  ...props
}) {
  const [field, meta] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      {...field}
      helperText={errorText}
      error={!!errorText}
      label={label}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      required={required}
      type={type}
    />
  );
}
