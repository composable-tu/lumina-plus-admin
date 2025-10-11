import "@/app/globals.css";
import {ThemeProvider} from "@/components/theme-provider"
import React from "react";
import {Toaster} from "sonner";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
    return (<html lang="zh_CN" suppressHydrationWarning>
    <head><title></title></head>
    <body>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <Toaster position="top-center"/>
    </ThemeProvider>
    </body>
    </html>)
}


