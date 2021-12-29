const mongoose = require('mongoose');
const url = `mongodb://grupo16:grupo16_vacas_2021@www.grupo16-proyecto2-vacas-2021.tk:27017/registro?authSource=admin`

mongoose.connect(url, {
    keepAlive:true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => {
    console.log('Conexión a mongodb establecida...')
}).catch(err => console.log(err))


/*
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
*/