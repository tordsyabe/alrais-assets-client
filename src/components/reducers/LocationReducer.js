import { locationActionType } from "../../utils/constants";

export const locationReducer = (state, action) => {
  switch (action.type) {
    case locationActionType.ADD_LOCATION:
      return [...state, action.payload];
    case locationActionType.SET_LOCATIONS:
      return action.payload;
    default:
      return state;
  }
};
