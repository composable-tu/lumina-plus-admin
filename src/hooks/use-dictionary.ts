import * as React from "react"
import {getDictionary} from "@/app/dictionaries"
import {getLocaleMatch} from "@/lib/utils"

export function useDictionary() {
    const [dict, setDict] = React.useState<Dictionary | null>(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        getDictionary(getLocaleMatch())
            .then(d => {
                setDict(d)
                setLoading(false)
            })
            .catch(error => {
                console.error("加载本地化字符串失败：", error)
                setLoading(false)
            })
    }, [])

    return {dict, loading}
}
