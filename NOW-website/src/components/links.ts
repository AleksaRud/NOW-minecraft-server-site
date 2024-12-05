function goToLink( link: string ){
    window.open(link, '_blank');
}
function getSource( link: string ){
    switch(true){
        case link.includes('t.me'):
            return 'Telegram';
        case link.includes('vk.com'):
            return 'Вк';
        case link.includes('youtube.com'):
            return 'YouTube';
        case link.includes('twitch'):
            return 'Twitch';
        default: 
            return 'Другое';
    }
} 

const tg_link = "https://t.me/now_minecraft_server";
const discord_link = "https://discord.gg/zbJr6Utm3P";

export {goToLink, getSource, tg_link, discord_link}