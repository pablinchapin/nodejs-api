const mysql = require('mysql');
 

const pool = mysql.createPool({
    connectionLimit: process.env.CONNECTION_LIMIT,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
 
});


let db = {};
 
db.getAllZones = () =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM zonas ',  (error, zones)=>{
            if(error){
                return reject(error);
            }
            return resolve(zones);
        });
    });
};

db.getAllZonesByDepartmentAndCity = (departament, city) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM zonas WHERE departamento = ? AND municipio = ?', [departament, city], (error, zones)=>{
            if(error){
                return reject(error);
            }
            return resolve(zones);
        });
    });
};
 
db.getOneZone = (id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM zonas WHERE id= ?', [id], (error, zone)=>{
            if(error){
                return reject(error);
            }
            return resolve(zone);
        });
    });
};
 
db.insertZone = (departamento, municipio, idZona, zona, descripcion) =>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO zonas (departamento, municipio, idZona, zona, descripcion) VALUES (?, ?, ?, ?, ?)', [departamento, municipio, idZona, zona, descripcion], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result.insertId);
        });
    });
};
 
 
db.updateZone = (departamento, municipio, idZona, zona, descripcion, id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE zonas SET departamento = ?, municipio = ?, idZona = ? , zona = ?, descripcion = ? WHERE id = ?', [departamento, municipio, idZona, zona, descripcion, id], (error)=>{
            if(error){
                return reject(error);
            }
             
              return resolve();
        });
    });
};
 
db.deleteZone = (id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('DELETE FROM zonas WHERE id = ?', [id], (error)=>{
            if(error){
                return reject(error);
            }
              return resolve();
         
        });
    });
};

module.exports = db;