import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge";
import {match} from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Get the locale of the user
 */
export function getLocaleMatch(): string {
    const headers = {'accept-language': 'en-US,en;q=0.5'}
    const languages = new Negotiator({headers}).languages()
    const locales = ['zh-CN']
    const defaultLocale = 'zh-CN'

    return match(languages, locales, defaultLocale).replaceAll('-', '_')
}
