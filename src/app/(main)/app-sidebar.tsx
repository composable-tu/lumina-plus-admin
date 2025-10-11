"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Calendar, ChevronsUpDown, Home, Inbox, Moon, Search, Sun} from "lucide-react";
import {useDictionary} from "@/hooks/use-dictionary";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useTheme} from "next-themes";

export function AppSidebar() {
    const {dict, loading} = useDictionary();
    const {theme, setTheme} = useTheme()

    if (loading || !dict) return null;

    const items = [{
        title: dict.main.function.home, url: "#", icon: Home,
    }, {
        title: dict.main.function.activity, url: "#", icon: Inbox,
    }, {
        title: dict.main.function.todo, url: "#", icon: Calendar,
    }, {
        title: dict.main.function.institution, url: "#", icon: Search,
    },]

    const getThemeI18n = () => {
        switch (theme) {
            case "light":
                return dict.theme.lightMode
            case "dark":
                return dict.theme.darkMode
            case "system":
                return dict.theme.system
            default:
                return dict.theme.lightMode
        }
    }

    return (<Sidebar collapsible="icon">
        <SidebarHeader>

        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (<SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    <item.icon/>
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <Sun
                                    className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
                                <Moon
                                    className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"/>
                                {getThemeI18n()}
                                <ChevronsUpDown className="ml-auto"/>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" className="w-[--radix-popper-anchor-width]">
                            <DropdownMenuLabel>{dict.theme.toggle}</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuCheckboxItem checked={theme === "light"} onClick={() => setTheme("light")}>
                                {dict.theme.light}
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={theme === "dark"} onClick={() => setTheme("dark")}>
                                {dict.theme.dark}
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={theme === "system"} onClick={() => setTheme("system")}>
                                {dict.theme.system}
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>)
}