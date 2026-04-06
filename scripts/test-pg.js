const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://josehpcastillo:41457466@localhost:5432/jcpathlab?schema=public"
});

client.connect()
  .then(() => {
    console.log('CONEXIÓN EXITOSA A POSTGRESQL');
    return client.query('SELECT NOW()');
  })
  .then(res => {
    console.log('Hora del servidor:', res.rows[0]);
    process.exit(0);
  })
  .catch(err => {
    console.error('ERROR DE CONEXIÓN:', err);
    process.exit(1);
  });
