import { ref } from "vue";
import type { Dayjs } from 'dayjs';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

type Review = {
    review_id: string;
    product_id: string;
    date: Dayjs;
    user_id: string;
    rate: number;
    text: string;
    advantages: string;
    disadvantages: string;
  };
  
  // Реактивный массив для хранения отзывов
    const reviews = ref<Review[]>([]);
  
    export async function fetchReviews(): Promise<void> {
        try {
          const response = await fetch('/api/reviews');
          if (!response.ok) {
            throw new Error(`Ошибка загрузки отзывов: ${response.statusText}`);
          }
          const data = await response.json();
          // Преобразуем дату в объект Dayjs (если даты из API приходят как ISO-строки)
          reviews.value = data.map((review: any) => ({
            ...review,
            date: dayjs(review.date)
          }));
        } catch (error) {
          console.error('Ошибка при получении отзывов:', error);
        }
      }

export { reviews }