function goToLink( link: string ){
    window.open(link, '_blank');
}
function getSource( link: string ){
    switch(true){
        case link.includes('t.me'):
            return {text:'Telegram', color: 'rgb(46, 147, 224)'};
        case link.includes('vk.com'):
            return {text: 'Вк', color:'rgb(0, 106, 255)'};
        case link.includes('youtube.com'):
            return {text:'YouTube', color: 'rgb(255, 0, 0)'};
        case link.includes('twitch'):
            return {text: 'Twitch', color: 'rgb(116, 10, 255)'};
        default: 
            return {text:'Другое', color: '#5a8fba'};
    }
} 

const tg_link = "https://t.me/now_minecraft_server";
const discord_link = "https://discord.gg/zbJr6Utm3P";

export {goToLink, getSource, tg_link, discord_link}