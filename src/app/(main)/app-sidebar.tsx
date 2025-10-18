"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
    Calendar,
    ChevronRight,
    ChevronsUpDown,
    Home,
    Inbox,
    Landmark,
    ListTodo,
    Moon,
    Search,
    Sun,
    Zap
} from "lucide-react";
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
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";

export function AppSidebar() {
    const {dict, loading} = useDictionary();
    const {theme, setTheme} = useTheme()

    if (loading || !dict) return null;

    const placeholderItems = [{
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
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" asChild>
                        <div>
                            <div
                                className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <div style={{backgroundImage: "url('/LuminaLOGO.svg')"}}
                                     className="size-5 bg-center bg-contain bg-no-repeat"/>
                            </div>
                            <div className="flex flex-col gap-0.5 leading-none">
                                <span className="font-medium">{process.env.SITE_NAME}</span>
                                <span className="text-xs">{process.env.SITE_ORG}</span>
                            </div>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem key={dict.main.function.home}>
                        <SidebarMenuButton asChild>
                            <a href='#'>
                                <Home/>
                                <span>{dict.main.function.home}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    <Collapsible key={dict.main.function.activity} asChild defaultOpen={true}
                                 className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={dict.main.function.activity}>
                                    <Zap/>
                                    <span>{dict.main.function.activity}</span>
                                    <ChevronRight
                                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {placeholderItems?.map((subItem) => (<SidebarMenuSubItem key={subItem.title}>
                                        <SidebarMenuSubButton asChild>
                                            <a href={subItem.url}>
                                                <span>占位</span>
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem></Collapsible>
                </SidebarMenu>
                <SidebarMenu>
                    <Collapsible key={dict.main.function.todo} asChild defaultOpen={true}
                                 className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={dict.main.function.todo}>
                                    <ListTodo/>
                                    <span>{dict.main.function.todo}</span>
                                    <ChevronRight
                                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {placeholderItems?.map((subItem) => (<SidebarMenuSubItem key={subItem.title}>
                                        <SidebarMenuSubButton asChild>
                                            <a href={subItem.url}>
                                                <span>占位</span>
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem></Collapsible>
                </SidebarMenu>
                <SidebarMenu>
                    <Collapsible key={dict.main.function.institution} asChild defaultOpen={true}
                                 className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={dict.main.function.institution}>
                                    <Landmark/>
                                    <span>{dict.main.function.institution}</span>
                                    <ChevronRight
                                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {placeholderItems?.map((subItem) => (<SidebarMenuSubItem key={subItem.title}>
                                        <SidebarMenuSubButton asChild>
                                            <a href={subItem.url}>
                                                <span>占位</span>
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem></Collapsible>
                </SidebarMenu>
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