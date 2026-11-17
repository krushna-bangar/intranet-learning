import { EventEmitter } from "node:events";

// 1. Create an emitter instance
const orderSystem = new EventEmitter();

// 2. Register a listener (Subscribe)
orderSystem.on("orderPlaced", (orderId, item) => {
  console.log(`Order #${orderId} received for: ${item}`);
});

// 3. Trigger the event (Publish)
orderSystem.emit("orderPlaced", 101, "Wireless Keyboard");
// Output: Order #101 received for: Wireless Keyboard


// One-Time Events (.once())

const server = new EventEmitter();

server.once("start", () => {
  console.log("Database connected! (Runs only once)");
});

server.emit("start"); // Output: Database connected! (Runs only once)
server.emit("start"); // Ignored

// Synchronous Execution Order

const emitter = new EventEmitter();

emitter.on("step", () => console.log("1. Validate user"));
emitter.on("step", () => console.log("2. Save to database"));
emitter.on("step", () => console.log("3. Send email"));

emitter.emit("step");
// Prints 1, then 2, then 3 in guaranteed order.



// Handling 'error' Events (Crucial Rule)

const fileProcessor = new EventEmitter();

// Always add an error listener to prevent crashes
fileProcessor.on("error", (err) => {
  console.error("Handled safely:", err.message);
});

fileProcessor.emit("error", new Error("File is corrupted"));
// Output: Handled safely: File is corrupted (App stays alive)


// Building Custom Classes with extends EventEmitter

class UserAuth extends EventEmitter {
  login(username) {
    console.log(`Checking credentials for ${username}...`);
    // Emit an event from inside the class
    this.emit("userLoggedIn", { username, time: new Date().toLocaleTimeString() });
  }
}

const auth = new UserAuth();

// Listen to your custom class
auth.on("userLoggedIn", (data) => {
  console.log(`Audit Log: ${data.username} logged in at ${data.time}`);
});

auth.login("Coder123");


//

const myEnventEmmiter =  new EventEmitter();

myEnventEmmiter.on('poke', () => {
    console.log('event triggered');
});

myEnventEmmiter.emit('poke');
