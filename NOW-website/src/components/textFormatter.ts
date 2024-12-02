function makeParagraphs( text: string ){
    let paragraphs = text.split('\n');
    for( let i = 0; i < paragraphs.length; i++){
        paragraphs[i] = '<div>' + paragraphs[i] + '</div>';
    };
    return paragraphs.join('');
}

export { makeParagraphs }