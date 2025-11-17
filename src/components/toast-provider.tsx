"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          fontSize: "14px"
        },
        success: {
          iconTheme: {
            primary: "#0864a7",
            secondary: "#ffffff"
          }
        },
        error: {
          iconTheme: {
            primary: "#e65428",
            secondary: "#ffffff"
          }
        }
      }}
    />
  );
}

