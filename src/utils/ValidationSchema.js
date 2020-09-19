import * as yup from "yup";

export const assetValidationSchema = yup.object({
  assetTag: yup.string().required("Asset Tag is required"),
  serial: yup.string().required("Serial is required"),
  locationId: yup.string().required("Location is required"),
  statusId: yup.string().required("Status is required"),
  modelId: yup.string().required(),
});
