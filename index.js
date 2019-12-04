const axios = require('axios');
const inquirer = require('inquirer')
const _ = require('lodash')

let score = 0

async function getWords(){
    const { data } = await axios.get(    'https://random-word-api.herokuapp.com//word?key=HBU3BWT6&number=10');
    return data;
}

async function getDefinition(word) {
    const { data } = await axios.get(`https://owlbot.info/api/v4/dictionary/${word}`, {
        headers: {
            'Authorization': `Token 974fbddef8eb891a2002694495fb59b4c283fed2`
        }
    })
    return data;
}


async function run() {
    const words = await getWords();
    const defn = await getDefinition(words[0])
    let definition = defn.definitions[0].definition;

    let qs = {
        type: 'list', 
        name: 'solution', 
        message: definition,
        choices: _.shuffle(words)
    }

    const answer = await inquirer.prompt(qs)

    if(answer.solution === words[0]){
        score ++
    }
    else{
        console.log(`No, the answer was ${words[0]}`)
    }
    console.log(score)
}

async function gameLoop(){
    for(let i = 0; i< 10; i++){
       await run()
    }
    console.log(`You Scored ${score} out of 10.`)
}

gameLoop()



