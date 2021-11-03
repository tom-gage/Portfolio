const assert = require('chai').assert;
const haikuDetect = require('../myModules/haikuDetection/haikuDetect');

oneSyllableWords = ['ass', 'man', 'butt', 'fuck', 'crap','jig','shit','shite','mite','flirt','girth','mirth','gust','point','ease','nerd','bye', 'axe', 'bate']

twoSyllableWords = ['prism','prisms','grotesque','grotesques','strengthen','many','any','pity','fitty','crappy','jiggy','arsehole','chemist','chagrin','invite','ever','doctor','session','prison','intern','trainer','argue','become','ion','scion']

threeSyllableWords = ['syllable', 'masturbate', 'enlighten', 'awaken', 'terrify','musical','picturesque', 'powerful', 'mythic', 'domestic', 'nutritious', 'nutrition']

fourSyllableWords = ['unexpected','supervision', 'eradicate','enunciate','repudiate', 'exemplify']

fiveSyllableWords = ['abbreviation']

describe('getNumberOfSyllables()', function(){
    oneSyllableWords.forEach(word => {
        it(word + ' should return ' + 1, function(){
            assert.equal(haikuDetect.getNumberOfSyllables(word), 1);
        })
    });


    twoSyllableWords.forEach(word => {
        it(word + ' should return ' + 2, function(){
            assert.equal(haikuDetect.getNumberOfSyllables(word), 2);
        })
    });

    threeSyllableWords.forEach(word => {
        it(word + ' should return ' + 3, function(){
            assert.equal(haikuDetect.getNumberOfSyllables(word), 3);
        })
    });

    fourSyllableWords.forEach(word => {
        it(word + ' should return ' + 4, function(){
            assert.equal(haikuDetect.getNumberOfSyllables(word), 4);
        })
    });

    fiveSyllableWords.forEach(word => {
        it(word + ' should return ' + 5, function(){
            assert.equal(haikuDetect.getNumberOfSyllables(word), 5);
        })
    });
})

