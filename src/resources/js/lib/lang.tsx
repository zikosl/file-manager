import { usePage } from "@inertiajs/react";


export function __(key: string, replace: any = {}) {
    const { language } = usePage<{
        language: any
    }>().props;
    let translation = language[key] ? language[key] : key;
    Object.keys(replace).forEach(function (key) {
        translation = translation.replace(':' + key, replace[key]);
    });

    return translation;
}
