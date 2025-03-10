"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/', (req, res) => (0, userController_1.getAllUsers)(req, res));
router.get('/:id', (req, res) => (0, userController_1.getUserById)(req, res));
router.post('/register', (req, res) => (0, userController_1.registerUser)(req, res));
router.post('/login', (req, res) => (0, userController_1.loginUser)(req, res));
exports.default = router;
