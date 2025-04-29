import { ref } from 'vue'

const projects = ref([
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/spawn.png`,
        title: 'Спавн',
        description: 'Главная площадь сервера. Тут находятся магазины небольшие проекты игроков',
        height: 540,
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/snowman_Oleg.png`,
        title: 'Снеговик',
        description: 'Просто снеговик Олег (в шляпе)',
        height: 720,
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/Halloween.png`,
        title: 'Хеллоин',
        description: 'БУ! Испугался?',
        height: 540,
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/skameyka.png`,
        title: 'Скамейка',
        description: '“Как-то кролик Крош захотел сделать что-нибудь полезное для своего домика. Он решил смастерить скамейку, чтобы сидеть на ней с друзьями по вечерам...”',
        height: 320,
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/hram.png`,
        title: 'Японский храм',
        description: 'Тут можно почувствовать настоящую гармонию и спокойствие',
        height: 640,
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/Mystery_Shack.png`,
        title: 'Хижина Чудес',
        description: 'Кто-то явно фанат Гравити Фолз',
        height: 480,
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/projects/amogus.png`,
        title: 'Есть ли на сервере предатель...',
        description: '',
        height: 320,
    },
])

export {projects}