const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const cors = require('cors'); // අලුතින් එක් කළා (npm install cors)

// Hugging Face සඳහා 7860 වඩාත් සුදුසුයි
const PORT = process.env.PORT || 7860;
let code = require('./pair'); 

const __path = process.cwd();

require('events').EventEmitter.defaultMaxListeners = 500;

// Middleware Setup
app.use(cors()); // වෙනත් domains වලින් එන requests allow කිරීමට
app.use(fileUpload()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// වැදගත්: routes වලට කලින් middleware setup වී තිබිය යුතුයි
app.use('/code', code);

app.get('/pair', (req, res) => {
    res.sendFile(path.join(__path, 'pair.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__path, 'main.html'));
});

// Server එක start කිරීම
app.listen(PORT, () => {
    console.log(`\nQUEEN RASHU MINI Server is running!`);
    console.log(`URL: http://localhost:${PORT}`);
});

module.exports = app;