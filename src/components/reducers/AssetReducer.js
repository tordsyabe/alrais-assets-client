import { assetActionType } from "../../utils/constants";

export const assetReducer = (state, action) => {
  switch (action.type) {
    case assetActionType.ADD_ASSET:
      return [...state, action.payload];
    case assetActionType.SET_ASSETS:
      return action.payload;
    case assetActionType.GET_ASSET:
      return [...state].filter((asset) => asset.uuid === action.payload.id);
    default:
      return state;
  }
};
