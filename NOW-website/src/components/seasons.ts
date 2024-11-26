import { ref } from 'vue';
const seasons = ref([
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        period: "31.10.2024-",
        minecraft_version: "1.21",
        name: "1 Сезон",
        description: "Сервер стартовал в 2024 году. \n"
                    +"Он не планировался быть публичным — мы с друзьями решили поиграть вместе и поснимать видео по нему. На старте нас было всего 8 человека. \n"
                    +"Но после того, как зрители стримов хотели попасть на сервер, мы решили устроить набор новичков на сервер. После подведения итогов набора к нам присоединилось ещё 4 человека. К сожалению, из-за нарушений правил сервера, один новичок был забанен. \n"
                    +"На данный момент в основной состав 1 сезона входит 11 игроков. \n"
                    +"Сервер потихоньку развивается. Спавн растёт, на нём появляются новые постройки, к разным праздникам спавн преображается. Например, в связи с Хеллоуином мы украсили спавн и добавили кучу жутких звуков.\n",
        hint: "Сезон ещё идёт, поэтому информация будет обновляться...",
        world_save: "", 
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        period: "31.10.2024",
        minecraft_version: "1.21",
        name: "Межсезонье",
        description: "Скоро..",
        hint: "Сезон ещё идёт, поэтому информацию будет обновляться...",
        world_save: "", 
    },
    {
        pic: `${import.meta.env.VITE_BASE_URL}/src/assets/cat.jpg`,
        period: "31.10.2024",
        minecraft_version: "1.21",
        name: "Сезон 2",
        description: "Скоро",
        hint: "",
        world_save: "", 
    },
])

function makeParagraphs( text: string ){
    let paragraphs = text.split('\n');
    for( let i = 0; i < paragraphs.length; i++){
        paragraphs[i] = '<div>' + paragraphs[i] + '</div>';
    };
    return paragraphs.join('');
}

for(let i=0; i<seasons.value.length; i++){
    seasons.value[i].description = makeParagraphs(seasons.value[i].description);
}

export {seasons}