import * as yup from "yup";

export const assetValidationSchema = yup.object({
  assetTag: yup.string().required("Asset Tag is required"),
  serial: yup.string().required("Serial is required"),
  locationId: yup.string().required(),
  statusId: yup.string().required(),
  modelId: yup.string().required(),
});
