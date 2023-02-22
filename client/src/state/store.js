import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// const stripe = require('stripe')('sk_test_51MFMKuLORCb5YSHKNm5asmYv8yGmNhuFVDTLm2Am5ltwzUekw2xDyiyiAA4rY9D43lo3Rq88zqBmIIedJLRdC8wQ00Jy3GEonp');

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
