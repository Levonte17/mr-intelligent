//IMPORT
const OpenAI = require('openai');
const { OpenAIApi, Configuration } = OpenAI;

//DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

//CONFIG
require('dotenv').config();

//INITIALIZE APP
const app = express();
const {
    PORT = 4007, organization, apiKey
} = process.env;

//INITIALIZE OPENAI
const configuration = new Configuration({
    organization: organization,
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));

//ROUTES
app.get('/', (req, res) => {
    res.send('WELCOME TO THE DIGITAL INVESTORS HUB');
});

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        "model": "text-davinci-003",
        "prompt": ` Pretend you are a LeVonte Larry. Answer 
        with motivational content.
    LeVonte Larry:
    How can I help you?
    Person: 
    I want somre motivation.
    LeVonte Larry:
    You Are Everything You Believe Yourself To Be.
    Believe In Yourself.
    Person: 
    ${message}?
    LeVonte Larry:`,
        "max_tokens": 500,
        "temperature": 0,
});
    console.log(response.data)
    if (response.data.choices [0].text){
    res.json({message: response.data.choices[0].text})
    } else {
        res.json({message: "No response"})
    }
});


app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
});
