import { ref } from "vue"

let news_cards = ref([
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/Halloween.png`,
        date: "31.10.2024",
        title: "Украшение спавна к Хеллоину",
        discription: "Бу! Испугался? Не бойся, я друг, я тебя не обижу. Иди сюда, иди ко мне, сядь рядом со мной, посмотри мне в глаза. Ты видишь меня? Я тоже тебя вижу. Давай смотреть друг на друга до тех пор, пока наши глаза не устанут. Ты не хочешь? Почему? Что-то не так?",
        btn_tytle: "",
        btn_link: "", 
    },
    {
        pic: "https://i.pinimg.com/736x/6b/ec/05/6bec05c4426a4879b8529198daecd002.jpg",
        date: "16.08.2024",
        title: "Завершение набора новичков",
        discription: "Набор новичков на сервер завершён! Теперь к нам присоедились 2 человека. Если у вас не получилось пройти, не расстраивайтесь, в будущем будем проводить ещё наборы",
        btn_tytle: "",
        btn_link: "", 
    },
    {
        pic: "https://i.pinimg.com/736x/6b/ec/05/6bec05c4426a4879b8529198daecd002.jpg",
        date: "14.08.2024",
        title: "Набираем новых участников на сервер!",
        discription: "Поздравляю всех с началом первого набора новичков на наш сервер! Время проведения набора до 00:00 по МСК 16 августа. Итоги будут подведены на стриме 16 августа",
        btn_tytle: "Подробнее о наборе",
        btn_link:"https://t.me/now_minecraft_server/34", 
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/start.jpg`,
        date: "20.07.2024",
        title: "Старт 1 сезона!",
        discription: "",
        btn_tytle: "",
        btn_link: "", 
    },
])
export {news_cards}