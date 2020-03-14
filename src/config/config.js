//============================
// Puerto
//============================
process.env.PORT = process.env.PORT || 4000;

//============================
// Entorno
//============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//============================
// Vencimiento del token
//============================
//24 horas
//60 minutos
//60 segundos

process.env.CADUCIDAD_TOKEN = 3600;


//============================
// SEED de autenticacion
//============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';




