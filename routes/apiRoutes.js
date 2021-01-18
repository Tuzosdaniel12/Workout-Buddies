const path = require("path");
const { ConnectionTimedOutError } = require("sequelize");
const db = require("../models");
const router = require("express").Router();

// When log in display a table of most recent work outs
// give user ability to user to find all workout they have saved
// ability to delete workouts from there saved workouts
// ability to update personal workouts
// ability to search work outs based on category
// ability to create work outs

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