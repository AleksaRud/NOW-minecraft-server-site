import { ref } from 'vue';
import { makeParagraphs } from './textFormatter';


export interface Season {
    season_id: string,
    pic: string,
    period: string,
    minecraft_version: string,
    name: string,
    description: string,
    hint: string,
    world_save: string, 
  }
  
export const seasons = ref<Season[]>([]);

export async function fetchSeasons(): Promise<void> {
  try {
    const response = await fetch('/api/seasons');
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
    }
    const data: Season[] = await response.json();
    seasons.value = data;
    for(let i=0; i<seasons.value.length; i++){
        seasons.value[i].description = makeParagraphs(seasons.value[i].description);
    }
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
  }
}