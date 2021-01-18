const path = require("path");
const db = require("../models");
const router = require("express").Router();


//read for homepage
router.get("/api/read/:id",function(req,res){
    db.workouts.findAll({where:{userID:req.params.id}}).then(function(results){
        res.json(results);
    });
});
//create workout
router.post("/api/create",function(req,res){
    db.workouts.create(req.body).then(function(results){
        res.json(results);
});
//read for all workouts
router.get("/workouts",function(req,res){
    db.workouts.findAll().then(function(results){
        res.json(results);
});
//read workouts based on category
router.get("/api/workouts/:category",function(req,res){
    db.workouts.findAll({where:{category:req.params.category}}).then(function(results){
        res.json(results);
    });
});
//delete workout off hompage
router.delete("/api/delete/:id",function(req,res){
    db.workouts.destroy({where:{id:req.params.id}}).then(function(results){
        res.json(results);
});
//update personal workout
router.put("api/update/:id",function(req,res){
    db.workouts.update({req.body},{where:{id:req.params.id}}).then(function(results){
        res.json(results);
});


module.exports = router;