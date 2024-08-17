"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteList = exports.updateList = exports.getSingleList = exports.createList = exports.getAllList = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body.user;
    const todo = yield prisma.todo.findMany({
        where: {
            userId,
        },
    });
    return res.status(200).json({
        todo,
    });
});
exports.getAllList = getAllList;
const createList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const { userId } = req.body.user;
    const todo = yield prisma.todo.create({
        data: {
            name,
            description,
            userId,
        },
    });
    return res.status(200).json({
        todo,
    });
});
exports.createList = createList;
const getSingleList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.body.user;
    const todo = yield prisma.todo.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    if ((todo === null || todo === void 0 ? void 0 : todo.userId) !== userId) {
        return res.status(401).json({
            message: 'User not Authorized',
        });
    }
    if (!todo) {
        return res.status(404).json({
            message: 'todo not list',
        });
    }
    return res.status(200).json({
        todo,
    });
});
exports.getSingleList = getSingleList;
const updateList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    const { userId } = req.body.user;
    const todo = yield prisma.todo.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name,
            description,
        },
    });
    if (todo.userId !== userId) {
        return res.status(401).json({
            message: 'User not Authorized',
        });
    }
    if (!todo) {
        return res.status(404).json({
            message: ' todo does not exst',
        });
    }
    return res.status(200).json({
        todo,
    });
});
exports.updateList = updateList;
const deleteList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.body.user;
    const todo = yield prisma.todo.delete({
        where: {
            id: parseInt(id),
        },
    });
    if (todo.userId !== userId) {
        return res.status(401).json({
            message: 'User not Authorized',
        });
    }
    if (!todo) {
        return res.status(404).json({
            message: 'todo does not exist',
        });
    }
    return res.status(200).json({
        message: 'todo successfully deleted',
    });
});
exports.deleteList = deleteList;
