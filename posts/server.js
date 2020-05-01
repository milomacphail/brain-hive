const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

port = process.env.PORT || 4020;

app.listen(port, () => console.log(`Server listening on port ${4020}`));
