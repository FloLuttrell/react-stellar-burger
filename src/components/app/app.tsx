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
import {fetchJson} from "../../utils/functions";
import {API_BASE_URL} from "../../utils/consts";
import {IngredientPage} from "../../pages/ingredient/ingredient";
import {getIngredients} from "../../services/actions/allAvailableIngredients";
import {WithAuthPage, WithoutAuthPage} from "../protected-route/protected-route";
import {refreshTokens} from "../../utils/api";
import {useAppDispatch} from "../../hooks";
import {setAuthPending, setUser} from "../../services/reducers/auth";
import {Modal} from "../modal/modal";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {OrderFeedDetailPage} from "../../pages/order-feed-detail/order-feed-detail-page";
import {OrderInfo} from "../order-info/order-info";
import {ProfileOrderDetailPage} from "../../pages/profile-order-detail/profile-order-detail-page";


export const App: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch(setAuthPending(true));
        const {accessToken} = await refreshTokens();
        if (accessToken) {
          const {resp, data} = await fetchJson(`${API_BASE_URL}/auth/user`, {
            method: "GET",
            headers: {"Authorization": accessToken},
          });
          if (resp.ok && data.success === true) {
            dispatch(setUser(data.user));
          } else {
            // todo: what to do when user load fails?
          }
        }
      } catch (err) {
        // todo: handle error
      } finally {
        dispatch(setAuthPending(false));
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
    <>
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
    </>
  );
}

