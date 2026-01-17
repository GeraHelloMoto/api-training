

const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;



const jokes = [
  "Почему программисты так плохо танцуют? У них нет алгоритма!",
  "Что сказал JavaScript, когда встретил JSON? Привет, объект моего воздыхания!",
  "Почему Python не ходит на вечеринки? Потому что у него слишком много отступов!",
  "Какой язык программирования самый скользкий? PHP — потому что на нём постоянно падают!",
  "Зачем программист ходит в лес? Чтобы найти дерево решений!",
  "Почему дайверы ныряют спиной вперед? Потому что они воткнутся в дно лодки если нырнут вперед!"
];

app.get('/', (req, res) => {
    res.send(`
        <h1> API of Jokes!</h1>
        <p>Available endpoints:</p>
        <ul>
        <li><a href="/jokes">/jokes</a> - all jokes</li>
        <li><a href="/joke/random">/joke/random</a> - random joke</li>
        <li><a href="/joke/0">/joke/0</a>- first joke!</li>
        </ul>
        <h3> Add a joke:</h3>
        <p>Use POST request at /joke with JSON body: {"joke": "Your joke"}</p>
        `);
});


app.get('/joke/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    res.json({
        joke: jokes[randomIndex],
        index: randomIndex
    });
});

  



app.get('/joke/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id >=0 && id < jokes.length) {
        res.json({
            joke: jokes[id],
            index: id
        });

    }
});


app.post('/joke', (req, res) => {
    const newJoke = req.body.joke;

    if (!newJoke || newJoke.trim() === '') {
        return res.status(400).json({
            error: 'Joke cant be void/or empty/ or i dunno)))!'
        });
    }

    jokes.push(newJoke);

    res.status(201).json({
        message: 'Joke has been successfully added!',
        totalJokes: jokes.length,
        newJokeIndex: jokes.length - 1,
        joke: newJoke
    });
});



app.listen(PORT, () => {
   console.log(`🚀 Сервер шуток запущен!`);
  console.log(`👉 Открой http://localhost:${PORT}`);
  console.log(`👉 Или протестируй в Postman!`);
});