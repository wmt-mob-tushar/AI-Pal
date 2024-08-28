import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

import { language } from '../locales';

/* Call this action to log out */
export const logout = createAction('LOGOUT');

export interface User {
  email: string;
  uid: string;
  password: string;
}

interface InitialState {
  user: User | null;
  token: string;
  credential: any;
  languageValue: object;
  languageCode: string;
  gptVersion: string;
  apiKey: string;
}
/* Initial state for the application */
const initialState: InitialState = {
  user: null,
  token: '',
  credential: null,
  languageValue: language.en,
  languageCode: 'en',
  gptVersion: 'gemini-1.5-flash-latest',
  apiKey: '',
};

/*  Slice for the application state */
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    rememberUserCredentials: (state, action: PayloadAction) => {
      state.credential = action.payload;
    },
    changeLanguage: (state, action: PayloadAction<object>) => {
      state.languageValue = action.payload;
    },
    setLanguageCode: (state, action: PayloadAction<string>) => {
      state.languageCode = action.payload;
    },
    setGptVersion: (state, action: PayloadAction<string>) => {
      state.gptVersion = action.payload;
    },
    setApiKey: (state, action: PayloadAction<string>) => {
      state.apiKey = action.payload;
    },
    rehydrate: (state, action: PayloadAction<InitialState>) => ({
      ...state,
      ...action.payload,
    }),
  },
  /* Extra reducer for handling logout */
  extraReducers: builder => builder.addCase(logout, () => initialState),
});

export const {
  setUser,
  setToken,
  rememberUserCredentials,
  changeLanguage,
  setLanguageCode,
  rehydrate,
  setGptVersion,
  setApiKey,
} = appSlice.actions;

export default appSlice.reducer;
