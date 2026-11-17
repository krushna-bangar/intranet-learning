// Creating a Buffer from a string (No import needed, Buffer is global)
const buf = Buffer.from("Hello Node");

console.log(buf);             // <Buffer 48 65 6c 6c 6f 20 4e 6f 64 65> (Hexadecimal bytes)
console.log(buf.toString());  // "Hello Node" (Converted back to readable text)
console.log(buf.length);      // 10 (Size in bytes)
