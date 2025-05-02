import { ref } from 'vue'
import { makeParagraphs } from './textFormatter';
import { reviews } from './review';
/*type Product = {
    product_id: string,
    category_id: string,
    pic: string,
    name: string,
    description: string,
    characteristics: string,
    price: number,
    status: string,
    rate:number,
  };*/
  interface Product {
    product_id: string;
    category_id: string;
    pic: string;
    name: string;
    description: string;
    characteristics: string;
    price: number;
    status: string;
    avgRating:number;
  } 
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


  
const pic_path = `${import.meta.env.VITE_BASE_URL}/src/assets/shop/products/`;

const products = ref<Product[]>([]);
export async function fetchProductsByCategory(categoryId: string): Promise<void> {
  try {
    // Формируем URL с query-параметром
    const response = await fetch(`/api/products?category_id=${encodeURIComponent(categoryId)}`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки товаров: ${response.statusText}`);
    }
    const data: Product[] = await response.json();
    products.value = data;
    console.log(data)
    /*products.value = data.map((item) => ({
      ...item,
      pic: pic_path + item.pic,
    }));*/
  } catch (error) {
    console.error(`Ошибка при получении товаров для категории ${categoryId}:`, error);
  }
}

export const product = ref<Product | null>(null);

export async function fetchProductById(product_id: string): Promise<void> {
  try {
    const response = await fetch(`/api/products/${product_id}`);
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке товара: ${response.statusText}`);
    }
    const data: Product = await response.json();
    product.value = data;
    //product.value.pic = pic_path + data.pic;
  } catch (error) {
    console.error(`Ошибка при получении товара с id ${product_id}:`, error);
  }
}

for(let i=0; i<products.value.length; i++){
    products.value[i].description = makeParagraphs(products.value[i].description);
    console.log(products.value[i])
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
/*function updateProductRates() {
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
  */
export {products, getStatusColor, sortProducts, }