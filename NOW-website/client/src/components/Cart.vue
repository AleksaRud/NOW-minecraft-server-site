<script setup lang="ts">
import { ref, onMounted, h } from 'vue';

const cartItems = ref<any[]>([]);

async function loadCart() {
  try {
    const res = await fetch('/api/cart');
    const data = await res.json();
    cartItems.value = data.cart || [];
  } catch (error) {
    console.error('Ошибка получения корзины:', error);
  }
}

onMounted(loadCart);

const columns = [
  {
    title: 'Картинка',
    dataIndex: 'pic',
    key: 'pic',
    customRender: ({ record }: { record: any }) => {
      return h('img', {
        src: record.pic,
        alt: record.name,
        style: 'width: 240px;'
      });
    }
  },
  {
    title: 'Название товара',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Количество',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'Стоимость',
    key: 'total',
    customRender: ({ record }: { record: any }) => {
      return `${record.price * record.quantity} BYN`;
    }
  }
];
</script>

<template>
  <div class="cart-page">
    <h2>Корзина</h2>
    <a-table
      :columns="columns"
      :dataSource="cartItems"
      rowKey="product_id"
      bordered
    />
  </div>
</template>
