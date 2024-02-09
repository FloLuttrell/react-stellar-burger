import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './services/appStore'
import { useEffect } from 'react'
import {setFeedState} from "./services/reducers/orderFeed";
import {getAuthTokens} from "./utils/functions";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useOrderFeed = (dispatch: AppDispatch) => useEffect(() => {
  const webSocket = new WebSocket("wss://norma.nomoreparties.space/orders/all");
  webSocket.addEventListener("message", (ev) => {
    const {data} = ev;
    const parsedData = JSON.parse(data);
    if (parsedData.success) {
      dispatch(setFeedState(parsedData));
    }
  });
  return () => {
    webSocket.close()
  };
}, [dispatch])

export const useProfileOrderFeed = (dispatch: AppDispatch) => useEffect(() => {
  const {accessToken} = getAuthTokens();
  const fixedToken = (accessToken ?? "").split(" ")[1];
  const webSocket = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${fixedToken}`);
  webSocket.addEventListener("message", (ev) => {
    const {data} = ev;
    const parsedData = JSON.parse(data);
    console.log(parsedData)
    if (parsedData.success) {
      dispatch(setFeedState(parsedData));
    }
  });
  return () => {
    webSocket.close()
  };
}, [dispatch])