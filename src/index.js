import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import KoaRespond from 'koa-respond';
import Knex from 'knex';
import { Model } from 'objection';
import dotenv from 'dotenv';

import knexConfig from '../database/knexConfig';
import { publicRoutes, privateRoutes } from './routes';

dotenv.config();

const app = new Koa();
const knex = Knex(knexConfig);
Model.knex(knex);

const { APP_PORT: port } = process.env;

app.use(KoaRespond());
app.use(KoaBodyParser());
app.use(publicRoutes(new KoaRouter()));

app.listen(port);
console.log(`Listening on port ${port}`);

export default app;