import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  userQueries: null,
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setUserQueries: (state, action) => {
      state.userQueries = action.payload
    },
  },
})

export const { setUser, setUserQueries } = globalSlice.actions

export default globalSlice.reducer
