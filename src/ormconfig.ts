import { DataSource } from 'typeorm';
import { IITadmin } from './iitadmin/entities/iitadmin.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'dpg-csi02m3gbbvc73f99kh0-a.onrender.com',
  port: 5432,
  username: 'iitbackend_user',
  password: '5xlZDilpugF6Bx42I4riDU1HSriERUvM',
  database: 'iitbackend',
  entities: [IITadmin],
  ssl: {
    rejectUnauthorized: false, // Disable SSL certificate validation
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
