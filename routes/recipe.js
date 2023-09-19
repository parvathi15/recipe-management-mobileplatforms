const router = require("express").Router();
let Recipe = require("../models/recipe.model.js");
const mongoose = require("mongoose"); //for database

router.route("/").get((req, res) => {
    Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json("Error: " + err));
});


router.route("/add").post((req, res) => {
  const recipeid = Number(req.body.recipeid);
  const title = req.body.title;
  const ingredients = req.body.ingredients;
  const description = req.body.description;
  const cookingtime = Number(req.body.cookingtime);
const newRecipe = new Recipe({

    recipeid,
    title,
    ingredients,
    description,
    cookingtime
  });

  newRecipe
    .save()
    .then(() => res.json("Recipe added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json("Recipe deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put((req, res) => {
    Recipe.findById(req.params.id)
    .then(recipe => {
        recipe.recipeid = Number(req.body.recipeid);
        recipe.title = req.body.title;
        recipe.ingredients = req.body.ingredients;
        recipe.description = req.body.description;
        recipe.cookingtime = Number(req.body.cookingtime);
        recipe
        .save()
        .then(() => res.json("recipe updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

  router.route('/title/:param').get((req, res) => {
    const param = req.params.param;
    console.log(param);
  
    Recipe.find({ title: new RegExp(param, 'i') })
      .then((recipes) => {
        res.json(recipes);
      })
      .catch((err) => {
        res.status(400).json({ error: 'Error searching for recipes' });
      });
  });



module.exports = router;