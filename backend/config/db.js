const mongoose = require('mongoose');
const url = `mongodb://grupo16:grupo16_vacas_2021@34.125.139.194:27017/registro?authSource=admin`

module.exports = ()=>{
    const connect = ()=>{
        mongoose.connect(
            url,
            {
                keepAlive:true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (err)=>{
                if (err){
                    console.log("DB: ¡Error!")
                }else{
                    console.log("Conexión a mongodb establecida")
                }
                
            }
        )
    }
    connect();
}