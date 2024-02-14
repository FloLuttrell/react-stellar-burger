import type {TypedUseSelectorHook} from 'react-redux'
import {useDispatch, useSelector} from 'react-redux'
import type {AppDispatch, RootState} from './services/appStore'
import {useEffect} from 'react'
import {setFeedState} from "./services/reducers/orderFeed";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useOrderFeed = (dispatch: AppDispatch, wsUrl: string) => useEffect(() => {
  const webSocket = new WebSocket(wsUrl);
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
}, [dispatch, wsUrl])
