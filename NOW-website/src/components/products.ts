import { ref } from 'vue'
import { makeParagraphs } from './textFormatter';
import { reviews } from './review';
type Product = {
    product_id: string,
    category_id: string,
    pic: string,
    name: string,
    description: string,
    characteristics: string,
    price: number,
    status: string,
    rate:number,
  };
  
  function sortProducts(products: Product[]): Product[] {
    const statusOrder: Record<string, number> = {
      "В наличии": 0,
      "Скоро в продаже": 1,
      "Нет в наличии": 2,
    };
  
    return products.sort((a, b) => {
      const prioA = statusOrder[a.status] ?? 99;
      const prioB = statusOrder[b.status] ?? 99;
      return prioA - prioB;
    });
  }
const products = ref<Product[]>([
    {
        product_id:'1',
        category_id:'stickers',
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/stickers.jpg`,
        name: 'Стикеры - NOW 1 сезон',
        description: '',
        characteristics: 'Размеры: А5, материал: мелованный картон 300г',
        price: 10,
        status:'Скоро в продаже',
        rate: 0,
    },
    {
        product_id:'2',
        category_id:'postcards',
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/panda.jpg`,
        name: 'Открытка - Pandalin “Лето”',
        description: 'Открытка с качественной печатью станет отличным дополнением к любому подарку или самостоятельным элементом декора.\nИзготовлена из плотной и качественной бумаги с яркими и насыщенными цветами. Задняя сторона открытки оставлена пустой для вашего личного послания. Учтите, что из-за особенностей цветопередачи, оттенки на отпечатке могут незначительно отличаться от изображения на экране.',
        characteristics: 'Размеры: А5, материал: мелованный картон 300г',
        price: 10,
        status:'Нет в наличии',
        rate: 0,
    },
    {        
        product_id:'3',
        category_id:'postcards',
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/kind_kail.jpg`,
        name: 'Открытка - KailDC ”Добрый модер”',
        description: 'Открытка с качественной печатью станет отличным дополнением к любому подарку или самостоятельным элементом декора.\nИзготовлена из плотной и качественной бумаги с яркими и насыщенными цветами. Задняя сторона открытки оставлена пустой для вашего личного послания. Учтите, что из-за особенностей цветопередачи, оттенки на отпечатке могут незначительно отличаться от изображения на экране.',
        characteristics: 'Размеры: А5, материал: мелованный картон 300г',
        price: 10,
        status:'В наличии',
        rate: 0,
    },
    {
        product_id:'4',
        category_id:'postcards',
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/just_rana.jpg`,
        name: 'Открытка - Raniya ”Просто Раниш”',
        description: 'Открытка с качественной печатью станет отличным дополнением к любому подарку или самостоятельным элементом декора.\nИзготовлена из плотной и качественной бумаги с яркими и насыщенными цветами. Задняя сторона открытки оставлена пустой для вашего личного послания. Учтите, что из-за особенностей цветопередачи, оттенки на отпечатке могут незначительно отличаться от изображения на экране.',
        characteristics: 'Размеры: А5, материал: мелованный картон 300г',
        price: 10,
        status:'Скоро в продаже',
        rate: 0,
    },
    {
        product_id:'5',
        category_id:'cards',
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cards.png`,
        name: 'Набор тематических карточек (4 шт.)',
        description: '',
        characteristics: 'Размеры: А5, материал: мелованный картон 300г',
        price: 5,
        status:'Скоро в продаже',
        rate: 0,
    },
    {
        product_id:'6',
        category_id:'cards',
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cards.png`,
        name: 'Набор тематических карточек (6 шт.)',
        description: '',
        characteristics: 'Размеры: А5, материал: мелованный картон 300г',
        price: 10,
        status:'Скоро в продаже',
        rate: 0,
    },
    {
        product_id:'7',
        category_id:'cards',
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cards.png`,
        name: 'Набор тематических карточек (8 шт.)',
        description: '',
        characteristics: 'Размеры: А5, материал: мелованный картон 300г',
        price: 15,
        status:'Скоро в продаже',
        rate: 0,
    },
    {
        product_id:'8',
        category_id:'cards',
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cards.png`,
        name: 'Набор тематических карточек (12 шт.)',
        description: '',
        characteristics: 'Размеры: А5, материал: мелованный картон 300г',
        price: 20,
        status:'Скоро в продаже',
        rate: 0,
    },
    {
        product_id:'9',
        category_id:'cards',
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cards.png`,
        name: 'Набор тематических карточек (12 шт.)',
        description: '',
        characteristics: 'Размеры: А5, материал: мелованный картон 300г',
        price: 20,
        status:'Скоро в продаже',
        rate: 0,
    },
    {
        product_id:'10',
        category_id:'cards',
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cards.png`,
        name: 'Набор тематических карточек (12 шт.)',
        description: '',
        characteristics: 'Размеры: А5, материал: мелованный картон 300г',
        price: 20,
        status:'Скоро в продажеa',
        rate: 0,
    },
])

for(let i=0; i<products.value.length; i++){
    products.value[i].description = makeParagraphs(products.value[i].description);
}

function getStatusColor(status: string){
    switch(true){
        case status.includes('В наличии'):
            return { color: '#b0f2d0', background_color: '#8ad6af40'};
        case status.includes('Нет в наличии'):
            return { color: '#e6eef5', background_color: '#c7d4e040'};
        case status.includes('Скоро в продаже'):
            return { color: '#a3d9e0', background_color: '#5a8fba40'};
        default: 
            return { color: '#e6eef5', background_color: '#c7d4e040'};
    }
}
function updateProductRates() {
    products.value.forEach((product) => {
      const productReviews = reviews.value.filter(
        (review) => review.product_id === product.product_id
      );
  
      if (productReviews.length > 0) {
        const total = productReviews.reduce(
          (sum, review) => sum + review.rate,
          0
        );
        product.rate = total / productReviews.length;
        product.rate = Math.round(product.rate * 10) / 10;
      } else {
        product.rate = 0;
      }
    });
  }
  
export {products, getStatusColor, sortProducts, updateProductRates}