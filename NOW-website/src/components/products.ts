import { ref } from 'vue'

const products = ref([
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/stickers.jpg`,
        name: 'Стикеры - NOW 1 сезон',
        description: '',
        price: 'Скоро в продаже',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/panda.jpg`,
        name: 'Открытка - Pandalin “Лето”',
        description: '',
        price: 'Скоро в продаже',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/kind_kail.jpg`,
        name: 'Открытка - KailDC ”Добрый модер”',
        description: '',
        price: 'Скоро в продаже',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/exegs_cute.jpg`,
        name: 'Открытка - ExEGS ”Просто робот”',
        description: '',
        price: 'Скоро в продаже',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cards.png`,
        name: 'Набор тематических карточек (4 шт.)',
        description: '',
        price: 'Скоро в продаже',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cards.png`,
        name: 'Набор тематических карточек (6 шт.)',
        description: '',
        price: 'Скоро в продаже',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cards.png`,
        name: 'Набор тематических карточек (8 шт.)',
        description: '',
        price: 'Скоро в продаже',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cards.png`,
        name: 'Набор тематических карточек (12 шт.)',
        description: '',
        price: 'Скоро в продаже',
    },
])

export {products}