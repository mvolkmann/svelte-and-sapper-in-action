const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname + '/..', 'public')));

const PORT = 1234; // can choose any port
app.listen(PORT, () => console.log('listening on port', PORT));
