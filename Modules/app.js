
//Default Import Module
import greet from "./greet.js";

//Named Import Module 
import { multiply as mul, divide as div } from './operations.js';
console.log(mul(6, 3)); 
console.log(div(10, 2));

console.log(greet('NODE'));


