"use client";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      richColors
      visibleToasts={10}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          info: "group-[.toast]:bg-lime-50 group-[.toast]:text-orange-600 group-[.toast]:border-orange-600",
          success:
            "group-[.toast]:bg-lime-50 group-[.toast]:text-green-600 group-[.toast]:border-green-600",
          warning:
            "group-[.toast]:bg-lime-50 group-[.toast]:text-yellow-600 group-[.toast]:border-yellow-600",
          error:
            "group-[.toast]:bg-lime-50 group-[.toast]:text-red-600 group-[.toast]:border-red-600",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
