import { ref } from "vue"

import type { Dayjs } from 'dayjs';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
interface Card {
    title: string;
    date: Dayjs;
    discription: string;
    pic: string;
    btn_link: string;
    btn_tytle: string;
}
  
const news_cards = ref<Card[]>([]);

export async function fetchNews(): Promise<void> {
    try {
        const response = await fetch('/api/news');
        if (!response.ok) {
        throw new Error(`Ошибка загрузки новостей: ${response.statusText}`);
        }
        const data = await response.json();
        // Преобразуем дату в объект Dayjs (если даты из API приходят как ISO-строки)
        news_cards.value = data.map((card: any) => ({
            ...card,
            date: dayjs(card.date)
        }));
        news_cards.value.sort((a, b) => b.date.diff(a.date));
    } catch (error) {
        console.error('Ошибка при получении новостей:', error);
    }
}

export { news_cards };
export type { Card };
