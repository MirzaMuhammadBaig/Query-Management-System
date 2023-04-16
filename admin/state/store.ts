import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import storage from "redux-persist/lib/storage"
import globalReducer from "./features/index"
import { api } from "../state/api/api"

const persistConfig = { key: "key", storage, version: 1 }

const persistedReducer = persistReducer(persistConfig, globalReducer)

export const store = configureStore({
  reducer: {
    global: persistedReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(api.middleware),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
