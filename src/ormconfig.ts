import { DataSource } from 'typeorm';
import { IITadmin } from './iitadmin/entities/iitadmin.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '@Esan0234',
  database: 'IITbackend',
  entities: [IITadmin],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
