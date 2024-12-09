import { ref } from 'vue'

const products = ref([
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        name: 'Стикеры - NOW 1 сезон',
        description: '',
        price: 'Скоро в продаже',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        name: 'Открытка - Pandalin “Злая панда”',
        description: '',
        price: 'Скоро в продаже',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        name: 'Открытка - KailDC ”Цветочный Коля”',
        description: '',
        price: 'Скоро в продаже',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        name: 'Открытка - ExEGS ”Приз в студию!”',
        description: '',
        price: 'Скоро в продаже',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        name: 'Набор тематических карточек (4 шт.)',
        description: '',
        price: 'Скоро в продаже',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        name: 'Набор тематических карточек (6 шт.)',
        description: '',
        price: 'Скоро в продаже',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        name: 'Набор тематических карточек (8 шт.)',
        description: '',
        price: 'Скоро в продаже',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        name: 'Набор тематических карточек (12 шт.)',
        description: '',
        price: 'Скоро в продаже',
    },
])

export {products}