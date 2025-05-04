import { ref } from 'vue';
import { makeParagraphs } from './textFormatter';
interface Player {
    player_id: string,
    nickname: string,
    season_id: string[],
    season_name: string[],
    card: string,
    all_pics: string[],
    info: string,
    links: string[]
  }

const players = ref<Player[]>([]);
export async function fetchPlayers(): Promise<void> {
    try {
        const response = await fetch('/api/players');
        if (!response.ok) {
        throw new Error(`Ошибка загрузки новостей: ${response.statusText}`);
        }
        const data = await response.json();
        players.value = data;
        for(let i=0; i<players.value.length; i++){
            players.value[i].info = makeParagraphs( players.value[i].info);
        }
    } catch (error) {
        console.error('Ошибка при получении новостей:', error);
    }
}
export const player = ref<Player | null>(null);

export async function fetchPlayerById(player_id: string): Promise<void> {
  try {
    const response = await fetch(`/api/players/${player_id}`);
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке товара: ${response.statusText}`);
    }
    const data: Player = await response.json();
    player.value = data;
    player.value.info = makeParagraphs(player.value.info);
  } catch (error) {
    console.error(`Ошибка при получении товара с id ${player_id}:`, error);
  }
}

/*
const players = ref([
    {
        player_id: "alexavain",
        nickname: 'AlexaVain',
        season_id: ["1", "1.5"],
        season_name: ["Сезон 1", "Межсезонье"],
        card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,
        all_pics: [`${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,
            `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/middle_season1/AlexaVain.png`,
            ],
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
        player_id: "kail_dc",
        nickname: 'Kail_DC',
        season_id: ["1", "1.5"],
        season_name: ["Сезон 1", "Межсезонье"],
        card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/Kail_DC.png`,
        all_pics: [`${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/Kail_DC.png`,],
        info: 'Я Кеил или же просто Коля. имею самую отдалённую базу, а мой дом ещё даже не построен (когда-нибудь точно построю, обещаю).'
            + '\nРазвожу грибы, грибочки, грибочечки. люблю слушать музыку и придумывать грандиозные планы, которые никогда не переходят в действие..'
            + '\nА также помните, не стоит менять ландшафт у меня на базе, потому что..'
            + '\n"НАФИГА МНЕ ТУТ ТВОИ ДЕРЕВЬЯ!"',
        links: [],
    },
    {
        player_id: "ksenon303",
        nickname: 'Ksenon303',
        season_id: ["1"],
        season_name: ["Сезон 1"],
        card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/Ksenon303.png`,
        all_pics: [`${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,],
        info: 'Мне зовут Наташа, но так же меня можно называть Ксю.  Люблю роботов, фурей и ещё что-то нибудь. Играю в некоторые игры. Пью чай и чай, иногда кофе. Но чай.  Кстати, чай поставьте:)',
        links: [],
    },
    {
        player_id: "raniya",
        nickname: 'Raniya',
        season_id: ["1"],
        season_name: ["Сезон 1"],
        card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/Raniya.png`,
        all_pics: [`${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,],
        info: 'Художник, явный любитель Undertale/Deltarune, в целом тихий человек.',
        links: [
            'https://www.youtube.com/@DeltaRana44_ru',
        ],
    },
    {
        player_id: "antika",
        nickname: 'AntikA',
        season_id: ["1", "1.5"],
        season_name: ["Сезон 1", "Межсезонье"],
        card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AnTikA.png`,
        all_pics: [`${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,],
        info: 'Самопровозглашенный батя сервера, потому что как и тот, "ушёл за хлебом". Иногда возвращается, но все время без хлеба. Умеет создавать видимость работы. В целом очень добрый и заботливый, если не злить.',
        links: [
            'https://vk.com/an_arts_info',
            'https://youtube.com/@an_tika?si=pvmGgXGBzQReI8-4',
        ],
    },
    {
        player_id: "tishkagamer",
        nickname: 'TishkaGamer',
        season_id: ["1"],
        season_name: ["Сезон 1"],
        card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/TishkaGamer.png`,
        all_pics: [`${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,],
        info: 'Тиша, 18 лет. Любит тырить у Кати пиджаки, в одном из таких ходит постоянно. Раньше носила бинты, сейчас их нет. По крайней мере на видимых частях тела. Любит кофе и энергетики, и кофе с энергетиком. Придерживается правила не убивать мирных животных в Майнкрафте. Уходит когда кто-то это делает. Взяла за правило никогда не приручать кошек и собак, по итогу есть и кот и собака. Играет только с сохранением инвентаря и не стесняется.',
        links: [],
    },
    {
        player_id: "katyamiki",
        nickname: 'KatyaMiki',
        season_id: ["1"],
        season_name: ["Сезон 1"],
        card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/KatyaMiki.png`,
        all_pics: [`${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,],
        info: 'Катуя Мики, из-за одного человечка осталась без пиджаков, поэтому вынуждена надевать футболки',
        links: [],
    },
    {
        player_id: "pandalin_owo",
        nickname: 'Pandalin_OwO',
        season_id: ["1", "1.5"],
        season_name: ["Сезон 1", "Межсезонье"],
        card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/Pandalin.png`,
        all_pics: [`${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,],
        info: 'Я вроде бы вменяемая, со мной приятно общаться. За мир во всем мире, но ох уж эти криперы... Побочный эффект - немного матерюсь. Люблю играть с ребятами на сервере.'
            + '\nПонимаете, я играю в Майн не ради модов, я играю в него ради строительства......андерстент?',
        links: [
            'https://t.me/pandalinochkaaa',
            'https://m.twitch.tv/pandalin_0w0_/home',
        ],
    },
    {
        player_id: "dr_elec_",
        nickname: 'Dr_Elec_',
        season_id: ["1", "1.5"],
        season_name: ["Сезон 1", "Межсезонье"],
        card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/Dr_Elec.png`,
        all_pics: [`${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,],
        info: 'Если вы меня не позовёте, я сам приду',
        links: [],
    },
    {
        player_id: "bylkawin",
        nickname: 'BylkaWin',
        season_id: ["1"],
        season_name: ["Сезон 1"],
        card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/BylkaWin.png`,
        all_pics: [`${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,],
        info: 'Весёлый человек, немного крот. Часто выкапывается непонятно где' 
            + '\n“Какой кирпич? ЭТО МРАМОР ИТАЛЬЯНСКИЙ!”',
        links: [],
    },
    {
        player_id: "exegs",
        nickname: 'ExEGS',
        season_id: ["1", "1.5"],
        season_name: ["Сезон 1", "Межсезонье"],
        card: `${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/ExEGS.png`,
        all_pics: [`${import.meta.env.VITE_BASE_URL}/src/assets/players_cards/season1/AlexaVain.png`,],
        info: 'Я Экзек, иногда нормальный, иногда упоротый' 
            + '\nКопаю чанки на серве по преколу.' 
            + '\nКак хобби занимаюсь программированием своей игры.',
        links: [
            'https://t.me/exek_channel',
            'https://www.twitch.tv/exe_gs',
        ],
    },

])
*/


export {players}