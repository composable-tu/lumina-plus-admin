"use client"

import {LoginForm} from "./login-form"
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export default function LoginPage() {
    const { resolvedTheme } = useTheme()
    const [logoSrc, setLogoSrc] = useState('/LogoColorBlack.png')

    useEffect(() => {
        if (resolvedTheme === 'dark') setLogoSrc('/LogoColorWhite.png'); else setLogoSrc('/LogoColorBlack.png')
    }, [resolvedTheme])

    return (<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
            <div className="flex items-center gap-2 self-center font-medium">
                <div className="flex h-16 w-48 items-center justify-center bg-contain bg-no-repeat bg-center"
                     style={{backgroundImage: `url('${logoSrc}')`}}>
                </div>
            </div>
            <LoginForm/>
        </div>
    </div>)
}
