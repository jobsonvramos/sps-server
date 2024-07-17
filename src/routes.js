const { Router } = require("express");
const userController = require('./controllers/userController');
const authMiddleware = require('./middlewares/authMiddleware');

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello World!");
});

routes.post('/login', userController.login);
routes.post('/register', authMiddleware, userController.register);
routes.put('/users/:id', authMiddleware, userController.update);
routes.delete('/users/:id', authMiddleware, userController.delete);
routes.get('/users', authMiddleware, userController.getAllUsers);
routes.get('/users/:id', authMiddleware, userController.getUserById);

module.exports = routes;
