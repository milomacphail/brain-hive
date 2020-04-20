const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const pool = require('pool');


app.use(cors());
app.use(express.json);

app.post('/', (req, res) => {
  try {
      const { username, email } = req.body;
      let {password } = req.body;

      const salt = await bcrypt.genSalt(10);

      const password = await bcrypt.hash(password, salt);

      let newUser = await pool.query(
          'INSERT INTO auth (username, password, email) VALUES ($1, $2, $3) RETURNING *',
          [username, password, email]
      );

      newUser = newUser.rows[0];
      res.json(newUser);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: error });
  }
});

const port = process.env.PORT || 6010;

app.listen(post, () => console.log(`App listening on port ${port}`));
