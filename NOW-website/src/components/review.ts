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
const reviews = ref<Review[]>([
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
        user_id: '111',
        rate: 4,
        text: 'asdgshdgh',
        advantages: '345345',
        disadvantages: '11'
    },
    {
        review_id: '3',
        product_id: '2',
        date: dayjs('20.02.2025', 'DD.MM.YYYY'),
        user_id: '12345',
        rate: 4.7,
        text: 'asdgshdgh',
        advantages: '345345aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaa',
        disadvantages: '11'
    },
    
    {
        review_id: '4',
        product_id: '3',
        date: dayjs('20.02.2025', 'DD.MM.YYYY'),
        user_id: '12345',
        rate: 5,
        text: 'asdgshdgh',
        advantages: '345345aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaa',
        disadvantages: '11'
    },
    {
        review_id: '5',
        product_id: '4',
        date: dayjs('20.02.2025', 'DD.MM.YYYY'),
        user_id: '12345',
        rate: 5,
        text: 'Да',
        advantages: '',
        disadvantages: ''
    },
])

export { reviews }