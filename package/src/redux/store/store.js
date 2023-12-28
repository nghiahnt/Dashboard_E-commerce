import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../auth/userSlice";
import handleCategory from "../category/reducer";
import handleProduct from "../product/reducer";
import handleBlog from "../blog/reducer";
import handleMenu from "../menu/reducer";
import handleOrder from "../order/reducer";
import handleProfile from "../profile/reducer";
import handleDiscountType from "../discountType/reducer";
import handleDiscount from "../discount/reducer";
import handleGameCard from "../gameCard/reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: handleCategory,
    products: handleProduct,
    blogs: handleBlog,
    menu: handleMenu,
    order: handleOrder,
    profile: handleProfile,
    discountType: handleDiscountType,
    discount: handleDiscount,
    gameCard: handleGameCard,
  },
});
