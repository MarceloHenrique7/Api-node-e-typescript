import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'

import 'dotenv/config';


import './shared/services/TranslationsYup';
import {router} from './routes';

const server = express();

server.use(cors({
  origin: process.env.ENABLED_CORS?.split(';') || []
}));
server.use(express.json());
server.use(cookieParser());
server.use(router);

export { server };
