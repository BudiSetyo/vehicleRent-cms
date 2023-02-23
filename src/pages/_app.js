import "@/styles/globals.css";
import { Roboto } from "@next/font/google";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "@/configs";

let persistor = persistStore(store);

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "900"],
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <main className={`${roboto.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
      </PersistGate>
    </Provider>
  );
}
