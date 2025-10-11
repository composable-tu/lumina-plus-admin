"use client"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"
import {Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator,} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import React, {useState} from "react";
import {useDictionary} from "@/hooks/use-dictionary";
import 'remixicon/fonts/remixicon.css'
import {toast} from "sonner";

export function LoginForm({className, ...props}: React.ComponentProps<"div">) {
    const {dict, loading} = useDictionary()
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')

    if (loading || !dict) return null;

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        if (!userId.trim() || !password.trim()) {
            if (!userId.trim()) toast.error(dict?.login.userIdRequired); else if (!password.trim()) toast.error(dict?.login.passwordRequired)
            e.preventDefault();
            return;
        }
        console.log("表单提交:", {userId, password});
    }

    return (<div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">{dict.login.welcome}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleFormSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="userId">{dict.login.userId}</FieldLabel>
                            <Input id="userId" type="text" placeholder={dict.login.userIdPlaceholder} required
                                   value={userId} onChange={(e) => setUserId(e.target.value)}/>
                        </Field>
                        <Field>
                            <div className="flex items-center">
                                <FieldLabel htmlFor="password">{dict.login.password}</FieldLabel>
                                <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                                    {dict.login.forgotPassword}
                                </a>
                            </div>
                            <Input id="password" type="password" required value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </Field>
                        <Field>
                            <Button type="submit" variant={!userId.trim() || !password.trim() ? "secondary" : "default"}
                                    disabled={!userId || !password}>
                                {dict.login.login}
                            </Button>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-2">
                                {dict.login.loginWith3rdParty}
                            </FieldSeparator>
                            <Button variant="outline" type="button" className="mb-2">
                                <i className="ri-wechat-line ri-lg"></i>
                                {dict.login.loginWithWeixin}
                            </Button>
                            <FieldDescription className="text-center">
                                {dict.login.dontHaveAccount}<a href="#">{dict.login.signUp}</a>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
            {dict.login.agreeToTerms}<a href="#">{dict.login.termsOfService}</a>{dict.login.and}<a
            href="#">{dict.login.privacyPolicy}</a>
        </FieldDescription>
    </div>)
}
