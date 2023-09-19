const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const RecipeSchema = new Schema(
  {
    recipeid: { type:Number, required: true},
    title: { type: String, required: true,unique: true},
    ingredients: { type: String, required: true},
    description: { type: String, required: true},
    cookingtime:{ type: Number, required: true}
  },
  {
    timestamps: true
  }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;