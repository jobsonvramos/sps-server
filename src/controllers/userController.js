const jwt = require('jsonwebtoken');
const admin = {id: 0, name: "admin", email: "admin@spsgroup.com.br", type: "admin", password:"1234"}
const users = [admin];
const defaultUserType = "user"

const SECRET_KEY = 'your_secret_key';

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'Email ja cadastrado' });
  }
  const newUser = { id: users.length + 1, name, email, type: defaultUserType, password };
  users.push(newUser);
  res.status(201).json(newUser);
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '10m' });
  res.json({ token });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users[userIndex] = { id: parseInt(id), name: name, email, password };
  res.json(users[userIndex]);
};

exports.delete = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.status(204).send();
};

exports.getAllUsers = (req, res) => {
  res.json(users.map(user => ({ id: user.id, username: user.name, email: user.email })));
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ id: user.id, username: user.name, email: user.email });
};