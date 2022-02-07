import { Router } from 'express';

export default Router().get('/hello', (req, res) => res.send({ message: 'Hello World!' }));
