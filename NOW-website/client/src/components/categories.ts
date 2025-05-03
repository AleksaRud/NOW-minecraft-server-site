import { ref } from 'vue'

export interface Category {
    _id: string;
    name: string;
    pic: string;
    category_id: string;
  }
  
export const categories = ref<Category[]>([]);

export async function fetchCategories(): Promise<void> {
  try {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
    }
    const data: Category[] = await response.json();
    categories.value = data;
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
  }
}