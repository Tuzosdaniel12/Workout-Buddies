const path = require("path");
const { ConnectionTimedOutError } = require("sequelize");
const router = require("express").Router();

// When log in display a table of most recent work outs
// give user ability to user to find all workout they have saved
// ability to delete workouts from there saved workouts
// ability to update personal workouts
// ability to search work outs based on category
// ability to create work outs

//read for homepage
router.get("/",function(req,res){

});
//create workout
router.post("/api/create",function(req,res){

});
//read for all workouts
router.get("/workouts",function(req,res){

});
//read workouts based on category
reouter.get("/api/workouts/:category",function(req,res){

});
//delete workout off hompage
router.delete("/api/delete",function(req,res){

});
//update personal workout
router.put("api/update",function(req,res){

});
//