"use client"

import "@/app/globals.css";
import {ThemeProvider} from "@/components/theme-provider"
import React from "react";
import {Toaster} from "sonner";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/app/(main)/app-sidebar";
import {useLocalStorage} from "@/hooks/web-storage";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useLocalStorage('sidebar_state', true);

    return (<html lang="zh_CN" suppressHydrationWarning>
    <head><title></title></head>
    <body>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <AppSidebar/>
            <main>
                <SidebarTrigger className="m-2"/>
                {children}
            </main>
        </SidebarProvider>
        <Toaster/>
    </ThemeProvider>
    </body>
    </html>)
}


