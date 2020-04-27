const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./routes/auth');

app.use(cors());
app.use(express.json());

app.use('/api/auth', auth);

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`app listening on port ${port}`));

//gateway auth service
//frontend gatewat authservice

//post /api/users
//post /api/users/login
//get /api/profiles/self
//post gatewayurl/api/profiles/

/*
{
    action: 'keyword ex: postUser, login, postProfile',
    reqBody: {
        body
    }
}

auth token still sent via x-auth-token header key

*/
