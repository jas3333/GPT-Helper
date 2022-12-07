import express from 'express';
const app = express();
app.use(express.json());
// import mongoose from 'mongoose';
// mongoose.connect('mongodb://localhost:27017/recipes');

const PORT = 5000;

// const recipeSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     ingredients: {
//         type: [],
//         required: true,
//     },
//     directions: [],
// });
//
// const Recipe = mongoose.model('Recipe', recipeSchema);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
