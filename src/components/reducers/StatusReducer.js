import { statusActionType } from "../../utils/constants";

export const statusReducer = (state, action) => {
  switch (action.type) {
    case statusActionType.ADD_STATUS:
      return [...state, action.payload];
    case statusActionType.SET_STATUS:
      return action.payload;
    default:
      return state;
  }
};
