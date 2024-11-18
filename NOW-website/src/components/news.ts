import { ref } from "vue"

let news_cards = ref([
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        date: "31.10.2024",
        title: "Украшение спавна к Хеллоину",
        discription: "Бу! Испугался? Не бойся, я друг, я тебя не обижу. Иди сюда, иди ко мне, сядь рядом со мной, посмотри мне в глаза. Ты видишь меня? Я тоже тебя вижу. Давай смотреть друг на друга до тех пор, пока наши глаза не устанут. Ты не хочешь? Почему? Что-то не так?",
        btn_tytle: "",
        btn_link: "", 
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        date: "16.08.2024",
        title: "Завершение набора новичков",
        discription: "Набор новичков на сервер завершён! Теперь к нам присоедились 2 человека. Если у вас не получилось пройти, не расстраивайтесь, в будущем будем проводить ещё наборы",
        btn_tytle: "",
        btn_link: "", 
    },
    {
        pic: "https://cdn.discordapp.com/attachments/1273165635504963626/1273174336194478131/image.png?ex=67399480&is=67384300&hm=e7fd823271df3c2bf6c9577c51748d1a0acd3f82e50037c94ce610d4fcd126cb&",
        date: "14.08.2024",
        title: "Набираем новых участников на сервер!",
        discription: "Поздравляю всех с началом первого набора новичков на наш сервер! Время проведения набора до 00:00 по МСК 16 августа. Итоги будут подведены на стриме 16 августа",
        btn_tytle: "Подробнее о наборе",
        btn_link:"https://t.me/now_minecraft_server/34", 
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        date: "20.07.2024",
        title: "Старт 1 сезона!",
        discription: "",
        btn_tytle: "",
        btn_link: "", 
    },
])
export {news_cards}