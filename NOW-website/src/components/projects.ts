import { ref } from 'vue'

const projects = ref([
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/Mystery_Shack.png`,
        title: 'Спавн',
        description: 'Главная площадь сервера. Тут находятся магазины небольшие проекты игроков',
        height: '540px',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/Mystery_Shack.png`,
        title: 'Снеговик',
        description: 'Просто снеговик Олег (в шляпе)',
        height: '720px',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/Mystery_Shack.png`,
        title: 'Остров Сакуры',
        description: '',
        height: '540px',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/Mystery_Shack.png`,
        title: 'Скамейка',
        description: '“Как-то кролик Крош захотел сделать что-нибудь полезное для своего домика. Он решил смастерить скамейку, чтобы сидеть на ней с друзьями по вечерам...”',
        height: '320px',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/Mystery_Shack.png`,
        title: 'Японский храм',
        description: 'Тут можно почувствовать настоящую гармонию и спокойствие',
        height: '640px',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/Mystery_Shack.png`,
        title: 'Хижина Чудес',
        description: 'Кто-то явно фанат Гравити Фолз',
        height: '480px',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/Mystery_Shack.png`,
        title: 'Есть ли на сервере предатель...',
        description: '',
        height: '320px',
    },
])

export {projects}