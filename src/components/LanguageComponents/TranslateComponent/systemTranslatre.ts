import  dataTranslation  from "@/data/dataTranslation";
import {useAppSelector } from "@/components/utils/hooks/redux";

let lang = null;
export const __ = (text: string) => {
    text = text.toLowerCase();
    const savedLang = useAppSelector((state) => 
    state.langSlice.lang);

    const items = dataTranslation.filter(e => e.code.toLowerCase() === text || e.en.toLowerCase() === text);

    if (items.length === 0) {
        return text; 
    }

    return items[0][lang ?? savedLang] ?? items[0].en;
};