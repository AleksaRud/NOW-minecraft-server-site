import { ref } from "vue"



type User ={
    user_id: string,
    nickname: string,
    avatar: string,
    email: string,
    password: string,
}

const users = ref<User[]>([
    {
        user_id: '1234',
        nickname: 'Pandalin_OwO',
        avatar: `${import.meta.env.VITE_BASE_URL}/src/assets/panda.jpg`,
        email: 'panda.lina@gmail.com',
        password: '12235',
    },
    {
        user_id: '12345',
        nickname: 'rana31',
        avatar: `${import.meta.env.VITE_BASE_URL}/src/assets/just_rana.jpg`,
        email: 'raniya@gmail.com',
        password: '354',
    },
    {
        user_id: '111',
        nickname: 'Cat',
        avatar: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        email: 'panda.lina@gmail.com',
        password: '11111',
    }
])
export { users}