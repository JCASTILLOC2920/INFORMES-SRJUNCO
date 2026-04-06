const { Client } = require('pg');

async function setup() {
  const adminClient = new Client({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '', // Sin contraseña por defecto
  });

  try {
    console.log('--- JC PATH LAB DB RECOVERY ---');
    await adminClient.connect();
    console.log('✅ Conectado como administrador.');

    await adminClient.query('CREATE DATABASE jcpathlab');
    console.log('✅ Base de datos jcpathlab creada.');
  } catch (err) {
    if (err.code === '42P04') {
      console.log('ℹ️ La base de datos ya existe.');
    } else {
      console.error('❌ Error administrando la base de datos:', err.message);
    }
  } finally {
    await adminClient.end();
  }
}

setup();
