import { usePage } from "@inertiajs/react";


export function __(key: string, replace: any = {}) {
    const { language } = usePage<{
        language: any
    }>().props;
    let translation = language[key] ? language[key] : key;
    console.log(language[key], key, language)
    Object.keys(replace).forEach(function (key) {
        translation = translation.replace(':' + key, replace[key]);
    });

    return translation;
}
