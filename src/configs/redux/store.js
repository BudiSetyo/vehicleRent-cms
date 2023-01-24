import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import rootReducers from "../redux/reducers/index";
// import { vehicleData, getVehicles } from "utils/dummyData/index";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
  // preloadedState: {
  //   vehicles: getVehicles,
  // },
});

export default store;
