import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth.slice';
import productReducer from '../features/products/product.slice';
import selectReducer from '../features/products/select.slice';
import uiReducer from '../features/ui/ui.slice';
import avalibleProducts from '../features/products/avalibles.slice';
import clientsReducer from '../features/clients/clients.slice';
import orderReducer from '../features/orders/orders.slice';
import cartOrder from '../features/newOrder/cartOrder.slice'
import addNewOrder from '../features/newOrder/newOrder.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    select: selectReducer,
    ui: uiReducer,
    avalible: avalibleProducts,
    clients: clientsReducer,
    orders: orderReducer,
    newOrder: cartOrder,
    addNewOrder,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
