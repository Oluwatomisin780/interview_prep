"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Todo_Route_1 = require("./Src/Routes/Todo.Route");
const User_Route_1 = require("./Src/Routes/User.Route");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', Todo_Route_1.todoRouter);
app.use('/api', User_Route_1.userRouter);
const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
