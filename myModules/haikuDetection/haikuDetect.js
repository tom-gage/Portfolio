function detectHaiku(potentialHaiku){
    let line;
    let syllableCount;

    if(countNewLines(potentialHaiku) > 3){
        return false;
    }
    
    line = getLineFromHaiku(potentialHaiku, 0);
    syllableCount = getNumberOfSyllables(line);

    if(syllableCount != 5){
        return false;
    }

    line = getLineFromHaiku(potentialHaiku, 1);
    syllableCount = getNumberOfSyllables(line);

    if(syllableCount != 7){
        return false;
    }

    line = getLineFromHaiku(potentialHaiku, 2);
    syllableCount = getNumberOfSyllables(line);

    if(syllableCount != 5){
        return false;
    }

    return true;
}

function countNewLines(potentialHaiku){
    return (potentialHaiku.match(/\n/g) || '').length + 1 //counts the length of the array returned by str.match()

}

function getLineFromHaiku(potentialHaiku, lineNumber){
    let currentLineIndex = 0;
    let beginingOfSlice = 0;
    let endOfSlice = 0;

    for (i = 0; i < potentialHaiku.length; i++){
        endOfSlice++;

        if (potentialHaiku[i] == '\n' || i + 2 > potentialHaiku.length){

            if(currentLineIndex == lineNumber){
                return potentialHaiku.slice(beginingOfSlice, endOfSlice);
            }
            beginingOfSlice = endOfSlice
            currentLineIndex++;
        }

    }

    return "";

}

function getNumberOfSyllables(sentence){
    let syllableCount = 0;

    //this needs a big rewrite

    let vowelsPattern = /[aeiouy]/gi

    const consecutiveVowelsPattern = /[aeiouy][aeiouy]/gi

    const consecutiveVowelsExceptionsPattern = /eo\b|io\b|(?<![s])ion\b/gi

    const silentEPattern = /[aeiouy][bcdfghjklmnpqrstvwxz]e\b|[bcdfghjklmnpqrstvwxz][bcdfghjklmnpqrstvwxz]e\b|\b[aeiouy]y[aeiouy]\b|[aeiou][bcdfghjklmnpqrstvwxz]se/gi

    const silentEExceptionsPattern = /[iy]re\b|[ai]ble\b/gi

    const endingInSMPattern = /sm\b|sms\b/gi

    const endingInEsquePattern = /esque\b|esques\b/gi

    const orseExceptionPattern = /\Borse\B/gi

    const iateExceptionPattern = /iate\b/gi


    //count the vowels in the sentance
    while (vowelsPattern.exec(sentence)) {
        ++syllableCount;
    }

    //for each pair of consecutive vowels, subtract one
    while (consecutiveVowelsPattern.exec(sentence)) {
        --syllableCount;
    }

    while (consecutiveVowelsExceptionsPattern.exec(sentence)) {
        ++syllableCount;
    }


    //for each word ending in a silent e, subtract one
    while (silentEPattern.exec(sentence)) {
        --syllableCount;
    }

    while (silentEExceptionsPattern.exec(sentence)) {
        ++syllableCount;
    }

    //for each word ending in sm, add one
    while (endingInSMPattern.exec(sentence)) {
        ++syllableCount;
    }

    //for each word ending in esque, add one
    while (endingInEsquePattern.exec(sentence)) {
        --syllableCount;
    }


    while (orseExceptionPattern.exec(sentence)) {
        --syllableCount;
    }

    while (iateExceptionPattern.exec(sentence)) {
        ++syllableCount;
    }


    if(syllableCount < 1){
        return 1
    }

    return syllableCount;
    
}

module.exports.detectHaiku = detectHaiku
module.exports.countNewLines = countNewLines
module.exports.getLineFromHaiku = getLineFromHaiku
module.exports.getNumberOfSyllables = getNumberOfSyllables
