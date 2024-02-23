import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {LoginPage} from "../../pages/login/login";
import {HomePage} from "../../pages/home/home";
import {ForgotPasswordPage} from "../../pages/forgot-password/forgot-password";
import {RegisterPage} from "../../pages/register/register";
import {ResetPasswordPage} from "../../pages/reset-password/reset-password";
import {ProfilePage} from "../../pages/profile/profile";
import React, {useEffect, useState} from "react";
import {OrderFeedPage} from "../../pages/order-feed/order-feed-page";
import {ProfileInfoPage} from "../../pages/profile-info/profile-info";
import {ProfileOrderListPage} from "../../pages/profile-order-list/profile-order-list";
import {IngredientPage} from "../../pages/ingredient/ingredient";
import {getIngredients} from "../../services/actions/allAvailableIngredients";
import {useAppDispatch} from "../../hooks";
import {Modal} from "../modal/modal";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {OrderFeedDetailPage} from "../../pages/order-feed-detail/order-feed-detail-page";
import {OrderInfo} from "../order-info/order-info";
import {ProfileOrderDetailPage} from "../../pages/profile-order-detail/profile-order-detail-page";
import {AppHeader} from "../app-header/app-header";
import styles from "./app.module.css"
import {authFetchUser, authRefreshToken} from "../../services/actions/auth";
import {ProtectedRoute} from "../protected-route/protected-route";


export const App: React.FunctionComponent = () => {
  const [authChecked, setAuthChecked] = useState(false)
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(authRefreshToken()).unwrap()
        await dispatch(authFetchUser()).unwrap();
      } catch (err) {
        // todo: handle error
      } finally {
        setAuthChecked(true)
      }
    })()
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  if (!authChecked) {
    return (<></>)
  }
  return (
    <div className={styles.appWrapper}>
      <div className={styles.appHeader}>
        <AppHeader/>
      </div>
      <div className={styles.appContent}>
        <Routes location={backgroundLocation || location}>
          <Route path="/register" element={(
            <ProtectedRoute anonymous={true}>
              <RegisterPage/>
            </ProtectedRoute>
          )}></Route>
          <Route path="/login" element={(
            <ProtectedRoute anonymous={true}>
              <LoginPage/>
            </ProtectedRoute>
          )}></Route>
          <Route path="/forgot-password" element={(
            <ProtectedRoute anonymous={true}>
              <ForgotPasswordPage/>
            </ProtectedRoute>
          )}></Route>
          <Route path="/reset-password" element={(
            <ProtectedRoute anonymous={true}>
              <ResetPasswordPage/>
            </ProtectedRoute>
          )}></Route>
          <Route path="/profile/orders/:orderId" element={(
            <ProtectedRoute anonymous={false}>
              <ProfileOrderDetailPage/>
            </ProtectedRoute>
          )}></Route>
          <Route path="/profile" element={(
            <ProtectedRoute anonymous={false}>
              <ProfilePage/>
            </ProtectedRoute>
          )}>
            <Route path="orders" element={<ProfileOrderListPage/>}></Route>
            <Route path="" element={<ProfileInfoPage/>}></Route>
          </Route>
          <Route path="/ingredients/:id" element={<IngredientPage/>}></Route>
          <Route path="/feed/:orderId" element={<OrderFeedDetailPage/>}></Route>
          <Route path="/feed" element={<OrderFeedPage/>}></Route>
          <Route path="/" element={<HomePage/>}></Route>
        </Routes>
        {backgroundLocation && (
          <Routes>
            <Route path="/ingredients/:id" element={
              <Modal title={"Детали ингридиента"} onClose={() => navigate("/")}>
                <IngredientDetails></IngredientDetails>
              </Modal>
            }></Route>
            <Route path="/feed/:orderId" element={
              <Modal title="" onClose={() => navigate("/feed")}>
                <OrderInfo></OrderInfo>
              </Modal>
            }></Route>
            <Route path="/profile/orders/:orderId" element={
              // <ProtectedRoute anonymous={false}>
              <Modal title="" onClose={() => navigate("/profile/orders")}>
                <OrderInfo></OrderInfo>
              </Modal>
              // </ProtectedRoute>
            }></Route>
          </Routes>
        )}
      </div>
    </div>
  );
}

