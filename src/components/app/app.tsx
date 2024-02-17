import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {LoginPage} from "../../pages/login/login";
import {HomePage} from "../../pages/home/home";
import {ForgotPasswordPage} from "../../pages/forgot-password/forgot-password";
import {RegisterPage} from "../../pages/register/register";
import {ResetPasswordPage} from "../../pages/reset-password/reset-password";
import {ProfilePage} from "../../pages/profile/profile";
import React, {useEffect} from "react";
import {OrderFeedPage} from "../../pages/order-feed/order-feed-page";
import {ProfileInfoPage} from "../../pages/profile-info/profile-info";
import {ProfileOrderListPage} from "../../pages/profile-order-list/profile-order-list";
import {IngredientPage} from "../../pages/ingredient/ingredient";
import {getIngredients} from "../../services/actions/allAvailableIngredients";
import {WithAuthPage, WithoutAuthPage} from "../protected-route/protected-route";
import {useAppDispatch} from "../../hooks";
import {Modal} from "../modal/modal";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {OrderFeedDetailPage} from "../../pages/order-feed-detail/order-feed-detail-page";
import {OrderInfo} from "../order-info/order-info";
import {ProfileOrderDetailPage} from "../../pages/profile-order-detail/profile-order-detail-page";
import {AppHeader} from "../app-header/app-header";
import styles from "./app.module.css"
import {authFetchUser, authRefreshToken} from "../../services/actions/auth";


export const App: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(authRefreshToken()).unwrap()
        await dispatch(authFetchUser()).unwrap();
      } catch (err) {
        // todo: handle error
      }
    })()
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <div className={styles.appWrapper}>
      <div className={styles.appHeader}>
        <AppHeader/>
      </div>
      <div className={styles.appContent}>
        <Routes location={backgroundLocation || location}>
          <Route path="/register" element={(
            <WithoutAuthPage>
              <RegisterPage/>
            </WithoutAuthPage>
          )}></Route>
          <Route path="/login" element={(
            <WithoutAuthPage>
              <LoginPage/>
            </WithoutAuthPage>
          )}></Route>
          <Route path="/forgot-password" element={(<WithoutAuthPage><ForgotPasswordPage/></WithoutAuthPage>)}></Route>
          <Route path="/reset-password" element={(<WithoutAuthPage><ResetPasswordPage/></WithoutAuthPage>)}></Route>

          <Route path="/profile" element={(<WithAuthPage><ProfilePage/></WithAuthPage>)}>
            <Route path="orders/:orderId" element={<ProfileOrderDetailPage/>}></Route>
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
              <Modal title="" onClose={() => navigate("/profile/orders")}>
                <OrderInfo></OrderInfo>
              </Modal>
            }></Route>
          </Routes>
        )}
      </div>
    </div>
  );
}

