"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store"; // persistStore 
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react"; // PersistGate import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} />
            <main>{children}</main>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
