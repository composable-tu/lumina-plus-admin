const dictionaries = {
    zh_CN: () => import('../dictionaries/zh_CN.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
    if (locale in dictionaries) return dictionaries[locale as keyof typeof dictionaries]()
    throw new Error(`Dictionary for locale '${locale}' not found`)
}