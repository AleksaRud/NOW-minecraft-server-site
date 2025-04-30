import { ref } from 'vue'

export interface Category {
    _id: string;
    name: string;
    pic: string;
    category_id: string;
  }
  
export const pic_path = `${import.meta.env.VITE_BASE_URL}/src/assets/shop/categories/`;

export const categories = ref<Category[]>([]);

export async function fetchCategories(): Promise<void> {
  try {
    if (categories.value.length > 0) return;
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
    }
    const data: Category[] = await response.json();
    categories.value = data.map((item) => ({
      ...item,
      pic: pic_path + item.pic,
    }));
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
  }
}

/*
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

export {categories}*/