const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./routes/auth');

app.use(cors());
app.use(express.json());

app.use('/api/auth', auth);

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`app listening on port ${port}`));
