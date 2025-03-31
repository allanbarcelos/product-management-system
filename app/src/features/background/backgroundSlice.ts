import { createSlice } from '@reduxjs/toolkit';

interface BackgroundState {
  color: string; // Cor de fundo atual
}

const initialState: BackgroundState = {
  color: 'bg-white', // Cor de fundo padrão
};

const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    setBackgroundColor: (state, action) => {
      state.color = action.payload; // Atualiza a cor de fundo
    },
  },
});

export const { setBackgroundColor } = backgroundSlice.actions;
export default backgroundSlice.reducer;