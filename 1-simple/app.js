'use strict';

const express = require('express')
const app = express();

app.get('/', (req, res) => { console.log('/'); res.send('Hello World!'); })

app.listen(8000, () => console.log('Example app listening on port 8000!'))