const redis = require('redis');

const redisClient = redis.createClient({
    socket: {
        host: 'www.grupo16-proyecto2-vacas-2021.tk',
        port: 6379
    },
    password: 'grupo16_vacas_2021',
    database: 0
});
/*COMENTADO PORQUE SE LLENA LA CONSOLA DE MUCHOS MENSAJES
redisClient.on('connect', ()=> {
    console.log("Servidor conectado a redis ...")
})

redisClient.on('ready', ()=> {
    console.log("Servidor conectado a redis y listo :D")
})

redisClient.on('end', ()=> {
    console.log("Servidor desconectado de redis")
})
*/
redisClient.on('error', (err)=>{
    console.log('No es posible conectarse con redis, ', err)
})


module.exports = redisClient;