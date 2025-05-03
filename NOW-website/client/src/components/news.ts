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
let news_cards = ref<Card[]>([
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/Halloween.png`,
        date: dayjs("31.10.2024", 'DD.MM.YYYY'),
        title: "Украшение спавна к Хеллоину",
        discription: "Бу! Испугался? Не бойся, я друг, я тебя не обижу. Иди сюда, иди ко мне, сядь рядом со мной, посмотри мне в глаза. Ты видишь меня? Я тоже тебя вижу. Давай смотреть друг на друга до тех пор, пока наши глаза не устанут. Ты не хочешь? Почему? Что-то не так?",
        btn_tytle: "",
        btn_link: "", 
    },
    {
        pic: "https://i.pinimg.com/736x/6b/ec/05/6bec05c4426a4879b8529198daecd002.jpg",
        date: dayjs("16.08.2024", 'DD.MM.YYYY'),
        title: "Завершение набора новичков",
        discription: "Набор новичков на сервер завершён! Теперь к нам присоедились 2 человека. Если у вас не получилось пройти, не расстраивайтесь, в будущем будем проводить ещё наборы",
        btn_tytle: "",
        btn_link: "", 
    },
    {
        pic: "https://i.pinimg.com/736x/6b/ec/05/6bec05c4426a4879b8529198daecd002.jpg",
        date: dayjs("14.08.2024", 'DD.MM.YYYY'),
        title: "Набираем новых участников на сервер!",
        discription: "Поздравляю всех с началом первого набора новичков на наш сервер! Время проведения набора до 00:00 по МСК 16 августа. Итоги будут подведены на стриме 16 августа",
        btn_tytle: "Подробнее о наборе",
        btn_link:"https://t.me/now_minecraft_server/34", 
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/start.jpg`,
        date: dayjs("20.07.2024", 'DD.MM.YYYY'),
        title: "Старт 1 сезона!",
        discription: "",
        btn_tytle: "",
        btn_link: "", 
    },
])
export { news_cards };
export type { Card };
