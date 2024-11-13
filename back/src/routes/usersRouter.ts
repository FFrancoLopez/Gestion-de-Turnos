import { Router } from "express";
import { getAllUsers, getUserById, registerUser, loginUser } from '../controllers/userController';


const router: Router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;