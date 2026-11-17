import greet from "./Modules/greet.js";
import storage from 'node-persist';
import express from 'express';
console.log(greet('node'));


console.log("Node.js project initialized successfully!");



//you must first call storage.init or initSync
storage.initSync( /* options ... */ );
// or 
// storage.init( /* options ... */ );

// then anywhere else in your code
await storage.setItem('name','Banger')
console.log(await storage.getItem('name')); // yourname


await storage.updateItem('name', 'Krushna');

console.log(await storage.getItem('name')); // yourname
