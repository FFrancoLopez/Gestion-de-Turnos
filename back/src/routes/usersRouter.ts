import { Router } from "express";
import { getUsers, getUser, registerUser, loginUser } from '../controllers/userController';


const router: Router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;