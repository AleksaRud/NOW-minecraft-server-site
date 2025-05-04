<template>
    <div class="news-admin">
      <h1>Управление новостями</h1>
      <button @click="resetForm">Создать новую новость</button>
  
      <!-- Список новостей -->
      <table>
        <thead>
          <tr>
            <th>Заголовок</th>
            <th>Дата</th>
            <th>Описание</th>
            <th>Изображение</th>
            <th>Кнопка</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in news_cards" :key="item._id">
            <td>{{ item.title }}</td>
            <td>{{ item.date.format('YYYY-MM-DD') }}</td>
            <td>{{ item.discription }}</td>
            <td>
              <img :src="item.pic" alt="Изображение" width="100" />
            </td>
            <td>
              <!-- Если кнопка нужна, можно отобразить ссылку -->
              <a :href="item.btn_link" target="_blank">{{ item.btn_tytle }}</a>
            </td>
            <td>
              <button @click="editNews(item)">Редактировать</button>
              <button @click="deleteNews(item._id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Форма создания/редактирования новости -->
      <form @submit.prevent="submitNews">
        <div>
          <label>Заголовок:</label>
          <input v-model="form.title" type="text" required />
        </div>
        <div>
          <label>Дата:</label>
          <input v-model="form.dateInput" type="date" required />
        </div>
        <div>
          <label>Описание:</label>
          <textarea v-model="form.discription" required></textarea>
        </div>
        <div>
          <label>Ссылка кнопки:</label>
          <input v-model="form.btn_link" type="text" placeholder="(опционально)" />
        </div>
        <div>
          <label>Текст кнопки:</label>
          <input v-model="form.btn_tytle" type="text" placeholder="(опционально)" />
        </div>
        <div>
          <label>Изображение:</label>
          <input type="file" @change="handleFileChange" />
          <div v-if="previewImage">
            <img :src="previewImage" alt="Превью" width="100" />
          </div>
        </div>
        <div>
          <button type="submit">{{ isEditing ? 'Обновить' : 'Добавить' }}</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import dayjs from 'dayjs';
  import { news_cards, fetchNews, type Card } from './news';
  
  // Флаги для определения режима работы формы
  const isEditing = ref(false);
  const editingId = ref<string | null>(null);
  
  // Форма – локальное состояние для редактирования / создания новости
  const form = reactive({
    title: '',
    // Для поля даты используем строковый формат (input type="date")
    dateInput: '',
    discription: '',
    btn_link: '',
    btn_tytle: '',
    pic: '' // сюда будет записано имя/URL изображения после загрузки
  });
  
  // Для выбранного файла и превью
  const selectedFile = ref<File | null>(null);
  const previewImage = ref('');
  
  // При монтировании компонента получаем новости
  onMounted(() => {
    fetchNews();
  });
  
  // Сброс формы в начальное состояние
  const resetForm = () => {
    form.title = '';
    form.dateInput = '';
    form.discription = '';
    form.btn_link = '';
    form.btn_tytle = '';
    form.pic = '';
    selectedFile.value = null;
    previewImage.value = '';
    isEditing.value = false;
    editingId.value = null;
  };
  
  // Обработка выбора файла
  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      selectedFile.value = target.files[0];
      previewImage.value = URL.createObjectURL(selectedFile.value);
    }
  };
  
  // Отправка формы: если выбран файл, сначала загружаем его на сервер,
  // затем отправляем POST (создание) или PUT (редактирование) запрос
  const submitNews = async () => {
    try {
      // Если выбран файл, загружаем его через эндпоинт /api/upload
      if (selectedFile.value) {
        const fileData = new FormData();
        fileData.append('file', selectedFile.value);
    
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: fileData
        });
    
        if (!uploadResponse.ok) {
          throw new Error('Ошибка загрузки изображения');
        }
    
        const uploadResult = await uploadResponse.json();
        // Ожидается, что сервер вернёт объект { filename: string }
        form.pic = uploadResult.filename;
      }
    
      // Готовим payload. Для даты можно отправлять в виде строки (например, YYYY-MM-DD)
      const payload = {
        title: form.title,
        date: form.dateInput,
        discription: form.discription,
        btn_link: form.btn_link,
        btn_tytle: form.btn_tytle,
        pic: form.pic
      };
    
      if (isEditing.value && editingId.value) {
        // Редактирование: обновляем новость методом PUT
        const putResponse = await fetch(`/api/news/${editingId.value}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
    
        if (!putResponse.ok) {
          throw new Error('Ошибка обновления новости');
        }
      } else {
        // Создание новой новости методом POST
        const postResponse = await fetch('/api/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
    
        if (!postResponse.ok) {
          throw new Error('Ошибка создания новости');
        }
      }
    
      resetForm();
      fetchNews();
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    }
  };
  
  // При нажатии кнопки "Редактировать" заполняем форму данными выбранной новости
  const editNews = (item: Card & { _id: string }) => {
    form.title = item.title;
    form.dateInput = item.date.format('YYYY-MM-DD');
    form.discription = item.discription;
    form.btn_link = item.btn_link;
    form.btn_tytle = item.btn_tytle;
    form.pic = item.pic;
    isEditing.value = true;
    editingId.value = item._id;
    previewImage.value = item.pic;
  };
  
  // Удаление новости по её идентификатору
  const deleteNews = async (id: string) => {
    try {
      const deleteResponse = await fetch(`/api/news/${id}`, {
        method: 'DELETE'
      });
    
      if (!deleteResponse.ok) {
        throw new Error('Ошибка удаления новости');
      }
    
      fetchNews();
    } catch (error) {
      console.error('Ошибка при удалении новости:', error);
    }
  };
  </script>
  
  <style scoped>
  .news-admin {
    max-width: 900px;
    margin: auto;
    padding: 20px;
  }
  .news-admin table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  .news-admin th,
  .news-admin td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  .news-admin th {
    background-color: #f2f2f2;
  }
  .news-admin form > div {
    margin-bottom: 15px;
  }
  </style>
  