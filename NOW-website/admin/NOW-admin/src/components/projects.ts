import { ref } from 'vue'

interface Project {
    pic: string,
    title: string,
    description: string,
    height: number,
}

const projects = ref<Project[]>([]);

export async function fetchProjects(): Promise<void> {
    try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
        throw new Error(`Ошибка загрузки новостей: ${response.statusText}`);
        }
        const data = await response.json();
        projects.value = data;
    } catch (error) {
        console.error('Ошибка при получении новостей:', error);
    }
}
export {projects}
export type {Project}