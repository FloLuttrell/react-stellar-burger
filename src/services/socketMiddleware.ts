import {Middleware, MiddlewareAPI} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "./appStore";
import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionMessage,
  wsConnectionStart,
  wsConnectionSuccess
} from "./reducers/orderFeed";

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    // return next => (action: AppActions) => {
    return next => (action: any) => {
      const {dispatch, getState} = store;
      const {type, payload} = action;
      if (type === wsConnectionStart.type) {
        if (socket) {
          socket.close();
        }
        // payload is ws url string
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.addEventListener("open", event => {
          dispatch(wsConnectionSuccess());
        });
        socket.addEventListener("error", event => {
          dispatch(wsConnectionError());
        });
        socket.addEventListener("message", event => {
          dispatch(wsConnectionMessage(event.data));
        });
        socket.addEventListener("close", event => {
          dispatch(wsConnectionClosed());
        });
      }
      next(action);
    };
  });
};