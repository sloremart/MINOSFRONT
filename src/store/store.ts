// store.ts (o store.js si estás usando JavaScript)

import { configureStore } from '@reduxjs/toolkit';
import { citas_slice } from '../commons/Citas/store/slice/indexCitas.tsx';
import { talento_humano_slice } from '../commons/Gedocumental/TalentoHumano/store/slice/indexTalentoHumano.tsx';
import { dash_board_slice } from '../commons/FacturacionDasboard/store/slice/indexDashBoardfacturacion.tsx';
import { users_slice } from '../commons/Login/store/slice/SliceLogin.tsx';

const store = configureStore({
  reducer: {
    citas_neuro: citas_slice.reducer,
    talento_humano:talento_humano_slice.reducer,
    dash_board:dash_board_slice.reducer, 
    users:users_slice.reducer


  },    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;