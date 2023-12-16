/**
 * StoreProvider component provides the Redux store to child components.
 * It wraps the children in a React Redux <Provider> with the store.
 */
"use client";
import store from "./store";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
