"use client"

import React from "react"
import {Moon, Sun} from "lucide-react"
import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {useDictionary} from "@/hooks/use-dictionary";

export default function Page() {
    const {setTheme} = useTheme()
    const {dict, loading} = useDictionary()

    if (loading || !dict) return null; else return (<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
                <Sun
                    className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
                <Moon
                    className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"/>
                <span className="sr-only">{dict.theme.toggle}</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
                {dict.theme.light}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
                {dict.theme.dark}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
                {dict.theme.system}
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>)
}


