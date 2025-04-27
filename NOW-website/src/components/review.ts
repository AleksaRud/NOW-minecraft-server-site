import { ref } from "vue";
import type { Dayjs } from 'dayjs';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

type Review = {
    review_id: string,
    product_id: string,
    date: Dayjs,
    user_id: string,
    rate: number,
    text: string,
    advantages: string,
    disadvantages: string,
  };
const review = ref<Review[]>([
    {
        review_id: '1',
        product_id: '2',
        date: dayjs('10.04.2025', 'DD.MM.YYYY'),
        user_id: '1234',
        rate: 5,
        text: 'asdgshdgh',
        advantages: '',
        disadvantages: ''
    },
    {
        review_id: '2',
        product_id: '2',
        date: dayjs('17.04.2025', 'DD.MM.YYYY'),
        user_id: 'asdser',
        rate: 4,
        text: 'asdgshdgh',
        advantages: '345345',
        disadvantages: '11'
    },
    {
        review_id: '2',
        product_id: '2',
        date: dayjs('20.02.2025', 'DD.MM.YYYY'),
        user_id: '123434',
        rate: 4.7,
        text: 'asdgshdgh',
        advantages: '345345',
        disadvantages: '11'
    },
])

export { review }