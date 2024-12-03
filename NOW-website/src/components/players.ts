import { ref } from 'vue';
import { makeParagraphs } from './textFormatter';

const players = ref([
    {
        season: 'Сезон 1',
        players_list: [
            {
                nickname: 'AlexaVain',
                card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,
                info: 'Сашка, главная панда сервера' 
                    + '\nРешила переместить себя в мир Гравити Фолз и построила себе базу ввиде хижины чудес (с музыкальным спровождением!)' 
                    + '\nНемного художник, любит игры, изредка стримит',
                links: [
                    'https://t.me/aleksis_nia',
                    'https://www.youtube.com/@alexavain6675',
                    'https://www.twitch.tv/aleksis_nia',
                ],
            },
            {
                nickname: 'Kail_DC',
                card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,
                info: 'Я Кеил или же просто Коля. имею самую отдалённую базу, а мой дом ещё даже не построен (когда-нибудь точно построю, обещаю).'
                    + '\nРазвожу грибы, грибочки, грибочечки. люблю слушать музыку и придумывать грандиозные планы, которые никогда не переходят в действие..'
                    + '\nА также помните, не стоит менять ландшафт у меня на базе, потому что..'
                    + '\n"НАФИГА МНЕ ТУТ ТВОИ ДЕРЕВЬЯ!"',
                links: [],
            },
            {
                nickname: 'Ksenon303',
                card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,
                info: 'Мне зовут Наташа, но так же меня можно называть Ксю.  Люблю роботов, фурей и ещё что-то нибудь. Играю в некоторые игры. Пью чай и чай, иногда кофе. Но чай.  Кстати, чай поставьте:)',
                links: [],
            },
            {
                nickname: 'Raniya',
                card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,
                info: 'Художник, явный любитель Undertale/Deltarune, в целом тихий человек.',
                links: [
                    'https://www.youtube.com/@DeltaRana44_ru',
                ],
            },
            {
                nickname: 'AntikA',
                card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,
                info: 'Самопровозглашенный батя сервера, потому что как и тот, "ушёл за хлебом". Иногда возвращается, но все время без хлеба. Умеет создавать видимость работы. В целом очень добрый и заботливый, если не злить.',
                links: [
                    'https://vk.com/an_arts_info',
                    'https://youtube.com/@an_tika?si=pvmGgXGBzQReI8-4',
                ],
            },
            {
                nickname: 'TishkaGamer',
                card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,
                info: 'Тиша, 18 лет. Любит тырить у Кати пиджаки, в одном из таких ходит постоянно. Раньше носила бинты, сейчас их нет. По крайней мере на видимых частях тела. Любит кофе и энергетики, и кофе с энергетиком. Придерживается правила не убивать мирных животных в Майнкрафте. Уходит когда кто-то это делает. Взяла за правило никогда не приручать кошек и собак, по итогу есть и кот и собака. Играет только с сохранением инвентаря и не стесняется.',
                links: [],
            },
            {
                nickname: 'KatyaMiki',
                card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,
                info: 'Катуя Мики, из-за одного человечка осталась без пиджаков, поэтому вынуждена надевать футболки',
                links: [],
            },
            {
                nickname: 'Pandalin_OwO',
                card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,
                info: 'Я вроде бы вменяемая, со мной приятно общаться. За мир во всем мире, но ох уж эти криперы... Побочный эффект - немного матерюсь. Люблю играть с ребятами на сервере.'
                    + '\nПонимаете, я играю в Майн не ради модов, я играю в него ради строительства......андерстент?',
                links: [
                    'https://t.me/pandalinochkaaa',
                    'https://m.twitch.tv/pandalin_0w0_/home',
                ],
            },
            {
                nickname: 'Dr_Elec_',
                card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/Dr_Elec.png`,
                info: '',
                links: [],
            },
            {
                nickname: 'BylkaWin',
                card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,
                info: 'Весёлый человек, немного крот. Часто выкапывается непонятно где' 
                    + '\n“Какой кирпич? ЭТО МРАМОР ИТАЛЬЯНСКИЙ!”',
                links: [],
            },
            {
                nickname: 'ExEGS',
                card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,
                info: 'Я Экзек, иногда нормальный, иногда упоротый' 
                    + '\nКопаю чанки на серве по преколу.' 
                    + '\nКак хобби занимаюсь программированием своей игры.',
                links: [
                    'https://t.me/exek_channel',
                    'https://www.twitch.tv/exe_gs',
                ],
            },
        ]
    },
])

for(let i=0; i<players.value.length; i++){
    for(let j=0; j<players.value[i].players_list.length; j++){
        players.value[i].players_list[j].info = makeParagraphs( players.value[i].players_list[j].info);
    }
}

export {players}