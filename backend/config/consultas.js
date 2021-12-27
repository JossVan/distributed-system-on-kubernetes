const mongoose = require("mongoose")
const redisClient = require("./redisdb")
require('./mongodb')

bandera = false
if (bandera==false){
    redisClient.connect().then( ()=> {
        console.log('Conexion a redis establecida...')
    })
    bandera = true
}

const personSchema = new mongoose.Schema({
    name: String,
    location: String,
    age: Number,
    vaccine_type: String,
    n_dose: Number
})

let Person = mongoose.model('personas', personSchema)


var Exported = {
    // 1. recopilacion de datos almacenados en mongo
    consulta1: async function(){
        var result
        bandera = false
        await Person.find({}, (err, data) =>{
            if (err){
                bandera = true
            }else{
                result =  data
            }
        }).clone() // .clone() porque mongo no permite que se ejecute la query muchas veces
        if (bandera) return {msg:"Error en consulta 1"}
        return result
    },
    // 2. top 3 areas con mayor vacunados con esquema completo mongo
    consulta2: async function(){
        var arreglo = []
        bandera = false
        await Person.find({n_dose:2}, (err, data) => {
            if(err){
                bandera = true
            }else{
                arreglo = data
            }
        }).clone()
        
        if (bandera) return {msg:"Error en consulta 2"}

        var dictionary = {}
        for (const x of arreglo){
            dictionary[x.location] = dictionary[x.location] ? dictionary[x.location]+1: 1            
        }

        var arreglo2 = []
        for (const [key, value] of Object.entries(dictionary)) {
            // console.log(key, value);
            arreglo2.push({
                'location': key,
                'valor': value
            })
        }
        arreglo2.sort(function (a,b){
            if(a.valor<b.valor){
                return 1;
            }
            if(a.valor>b.valor){
                return -1;
            }
            return 0;
        });
        return arreglo2.slice(0,3)
    },
    // 3. grafico porcentaje de vacunados, una dosis por departamentos
    consulta3: async function(){
        var arreglo = []
        bandera = false
        await Person.find({n_dose:1}, (err, data) => {
            if(err){
                bandera = true
            }else{
                arreglo = data
            }
        }).clone()
        
        if (bandera) return {msg:"Error en consulta 3"}

        var dictionary3 = {}
        for (const x of arreglo){
            dictionary3[x.location] = dictionary3[x.location] ? dictionary3[x.location]+1: 1            
        }

        var arreglo3 = []
        for (const [key, value] of Object.entries(dictionary3)) {
            // console.log(key, value);
            arreglo3.push({
                'location': key,
                'valor': value
            })
        }
        return arreglo3
    },
    // 4. ""   porcentaje de vacunados esquema completo por departamentos
    consulta4: async function(){
        var arreglo = []
        bandera = false
        await Person.find({n_dose:2}, (err, data) => {
            if(err){
                bandera = true
            }else{
                arreglo = data
            }
        }).clone()
        
        if (bandera) return {msg:"Error en consulta 4"}

        var dictionary = {}
        for (const x of arreglo){
            dictionary[x.location] = dictionary[x.location] ? dictionary[x.location]+1: 1            
        }

        var arreglo4 = []
        for (const [key, value] of Object.entries(dictionary)) {
            // console.log(key, value);
            arreglo4.push({
                'location': key,
                'valor': value
            })
        }
        return arreglo4
    },
    // 5. ultimas 5 personas vacunadas en redis
    consulta5: async function(){
        //await redisClient.connect()
        var lista = await redisClient.lRange('listaPersonas', 0, 4)
        //await redisClient.disconnect()
        
        let Personas = []
        lista.map(person =>{
            Personas.push(JSON.parse(person))
        })

        return Personas
    },
    // 6. vacunados por rango de edades
    consulta6: async function(){
        //await redisClient.connect()
        var [ninos, adolescentes, jovenes, adultos, vejez] = await Promise.all([
            redisClient.get("rango1"),
            redisClient.get("rango2"),
            redisClient.get("rango3"),
            redisClient.get("rango4"),
            redisClient.get("rango5")
        ])
        result6 = {
            'ninos': ninos,
            'adolescentes': adolescentes,
            'jovenes': jovenes,
            'adultos': adultos,
            'vejez': vejez
        }
        // los valores son string, a excepcion de los que no existan, esos son tipo null
        //await redisClient.disconnect()
        return result6
    }
}

module.exports = Exported