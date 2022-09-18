import { createRequire } from "module";
const require = createRequire(import.meta.url)
require('@tensorflow/tfjs-core'); /* or @tensorflow/tfjs-node */
require('@tensorflow/tfjs-backend-cpu');
const tf = require("@tensorflow/tfjs-node")
import * as use from '@tensorflow-models/universal-sentence-encoder';
// use.load().then(model => {
//   const sentences = [
//     'Hello.',
//     'How are you?'
//   ];
//   model.embed(sentences).then(embeddings => {
//     // embeddings.print(true );
//     // let cosine = cosine_similarity_matrix(embeddings)
//     // console.log(cosine)
//     console.log(embeddings.get([0]))
//     // tf.losses.cosineDistance(embeddings[0], embeddings[1], 0).print()
//   });
// });
const model = await use.load();
const embeddings = (await model.embed(['queen', 'king', 'kind'])).unstack()
tf.losses.cosineDistance(embeddings[0], embeddings[1], 0).print() // 0.39812755584716797


// function similarity(a, b) {
//     var magnitudeA = Math.sqrt(this.dot(a, a));
//     var magnitudeB = Math.sqrt(this.dot(b, b));
//     if (magnitudeA && magnitudeB)
//       return this.dot(a, b) / (magnitudeA * magnitudeB);
//     else return false
//   }

// function cosine_similarity_matrix(matrix){
//     let cosine_similarity_matrix = [];
//     for(let i=0;i<matrix.length;i++){
//       let row = [];
//       for(let j=0;j<i;j++){
//         row.push(cosine_similarity_matrix[j][i]);
//       }
//       row.push(1);
//       for(let j=(i+1);j<matrix.length;j++){
//         row.push(this.similarity(matrix[i],matrix[j]));
//       }
//       cosine_similarity_matrix.push(row);
//     }
//     return cosine_similarity_matrix;
//   }