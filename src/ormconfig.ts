import { DataSource } from 'typeorm';
import { IITadmin } from './iitadmin/entities/iitadmin.entity';

// const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: 'dpg-csi02m3gbbvc73f99kh0-a.onrender.com',
//   port: 5432,
//   username: 'iitbackend_user',
//   password: '5xlZDilpugF6Bx42I4riDU1HSriERUvM',
//   database: 'iitbackend',
//   entities: [IITadmin],
//   ssl: {
//     rejectUnauthorized: false, // Disable SSL certificate validation
//   },
// });
const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://iitbackend_user:5xlZDilpugF6Bx42I4riDU1HSriERUvM@dpg-csi02m3gbbvc73f99kh0-a.oregon-postgres.render.com/iitbackend',
  entities: [IITadmin],
  migrations: [__dirname + '/migration/*{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false,
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;

// const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: 'dpg-csi02m3gbbvc73f99kh0-a.onrender.com',
//   port: 5432,
//   username: 'iitbackend_user',
//   password: '5xlZDilpugF6Bx42I4riDU1HSriERUvM',
//   database: 'iitbackend',
//   entities: [IITadmin],
//   ssl: {
//     rejectUnauthorized: false, // Disable SSL certificate validation
//   },
// });
