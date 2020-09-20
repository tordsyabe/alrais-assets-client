import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useField } from "formik";
import React from "react";

export default function FormikSelectField({
  values,
  label,
  variant,
  fullWidth,
  size,
  ...props
}) {
  const [field, meta] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <FormControl
      variant={variant}
      error={!!errorText}
      fullWidth={fullWidth}
      size={size}
    >
      <InputLabel>{label}</InputLabel>
      <Select {...field} label={label}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {values.map((value) => (
          <MenuItem key={value.uuid} value={value.uuid}>
            {value.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
}
