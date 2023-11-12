import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import appApi from "./appApi"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import loginSlice from "@/features/login/redux/loginSlice"

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["auth"], // login 슬라이스만 유지하도록 whitelist 설정
}

const reducers = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  // code: codeMgtReducer,
  auth: loginSlice,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(appApi.middleware),
  devTools: false,
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
