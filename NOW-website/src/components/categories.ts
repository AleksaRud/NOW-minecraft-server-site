import { ref } from 'vue'

const categories = ref([
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/shop/categories/accessuaries.png`,
        name: 'Аксессуары',
        category_id: 'accessories',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/panda.jpg`,
        name: 'Блокноты',
        category_id: 'notebooks',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/shop/categories/cups.png`,
        name: 'Кружки',
        category_id: 'cups',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/just_rana.jpg`,
        name: 'Открытки',
        category_id: 'postcards',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/shop/categories/stickers.jpg`,
        name: 'Наклейки и стикеры',
        category_id: 'stickers',
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cards.png`,
        name: 'Карточки',
        category_id: 'cards',
    },
])

export {categories}