"use client";
import "../styles/globals.scss";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/store/store";
import Header from "@/components/Header";
import InitialUserLoad from "@/components/InitialUserLoad"

export const metadata = {
  title: "GHGV2",
  description: "development",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <InitialUserLoad>
            <Header />
            {children}
          </InitialUserLoad >
        </body>
      </html>
    </Provider>
  );
}
