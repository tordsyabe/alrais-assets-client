import * as yup from "yup";

export const assetValidationSchema = yup.object({
  assetTag: yup.string().required("Asset Tag is required"),
  name: yup.string().required("Asset Name is required"),
  serial: yup.string().required("Serial is required"),
  locationId: yup.string().required("Location is required"),
  statusId: yup.string().required("Status is required"),
  modelId: yup.string().required(),
});

export const locationValidationSchema = yup.object({
  name: yup.string().required("Location name is required"),
  address: yup.string().required("Location address is required"),
  city: yup.string().required("Location city is required"),
});
export const statusValidationSchema = yup.object({
  name: yup.string().required("Status name is required"),
  type: yup.string().required("Status type is required"),
});
