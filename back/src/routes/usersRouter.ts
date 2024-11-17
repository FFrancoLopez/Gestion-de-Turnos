import { Request, Response, Router } from "express";
import { getUsers, registerUser, loginUser, getUserById } from '../controllers/userController';
import { ILoginUserDto, IUserDto } from "../dto/UserDto";


const router: Router = Router();

router.get('/', (req: Request, res: Response) => getUsers(req, res));
router.get('/:id', (req: Request < {id: string} >, res: Response) => getUserById(req, res));
router.post('/register', (req: Request < unknown, unknown, IUserDto >, res: Response) => registerUser(req, res));
router.post('/login', (req: Request < unknown, unknown, ILoginUserDto >, res: Response) => loginUser(req, res));

export default router;