const express = require('express');
const apiRouter = express.Router();
 
const db = require('./db.js');
 
module.exports = apiRouter;


apiRouter.get('/', async (req, res, next)=>{
    try {
        const zones = await db.getAllZones();
        res.status(200).json({zones: zones});
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});
 
apiRouter.param('zoneId', async (req, res, next, zoneId)=> {
    try{
        const zone = await db.getOneZone(zoneId);
        req.zone = zone;
        next();
    } catch(e) {
        console.log(e);
        res.sendStatus(404);
    }
});
 
apiRouter.get('/:zoneId',  (req, res, next)=>{
    res.status(200).json({zone: req.zone});
});


apiRouter.get('/consulta/:department/:city', async(req, res, next) => {
    
    try{
        const zones = await db.getAllZonesByDepartmentAndCity(req.params.department, req.params.city);
        res.status(200).json({zones: zones});
    } catch(e) {
        console.log(e);
        res.sendStatus(404);
    }

});
 
 
apiRouter.post('/',  async (req, res, next)=>{
    try{
        const departamento = req.body.zone.departamento;
        const municipio = req.body.zone.municipio;
        const idZona = req.body.zone.idZona;
        const zona = req.body.zone.zona;
        const descripcion = req.body.zone.descripcion;
         
              if (!departamento || !municipio || !idZona || !zona || !descripcion) {
                return res.sendStatus(400);
             }
 
        const zone =  await db.insertZone(departamento, municipio, idZona, zona, descripcion).then(insertId=>{return db.getOneZone(insertId);});
        res.json({zone: zone});
 
    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});
 
 
apiRouter.put('/:zoneId',  async (req, res, next)=>{
    try{
        const departamento = req.body.zone.departamento;
        const municipio = req.body.zone.municipio;
        const idZona = req.body.zone.idZona;
        const zona = req.body.zone.zona;
        const descripcion = req.body.zone.descripcion;
        const id = req.params.zoneId;
   
        if (!id) {
            return res.sendStatus(400);
        }
          
 
        const zone =  await db.updateZone(departamento, municipio, idZona, zona, descripcion, id).then(()=>{return db.getOneZone(id);});
        res.json({zone: zone});
         
    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});
 
 
 
apiRouter.delete('/:zoneId', async (req, res, next)=>{
    try{
        const zoneId = req.params.zoneId;
        const response = await db.deleteZone(zoneId);
        return res.sendStatus(204);
 
    } catch(e){
        console.log(e);
    }
})
 
 
 
module.exports = apiRouter;