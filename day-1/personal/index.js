// const firstName = "Ali"

const mathObjects = require('./math.js')

// const lastName  ="Rahman"

// const greeting  =   `Hello I am  ${firstName} ${lastName}`

// console.log(greeting)

// const animal = ["anjing","kucing","lembu", "ayam","kambing"]

// for(let i=0; i<animal.length;i++){
//     let sentence = `animal at index=${i} is ${animal[i]}`
//     console.log(sentence)
// }

const math = require ('./math.js');
const time = require('./time.js');

console.log(math.add(5,6))

console.log(`The current time is ${time.hours} : ${time.minute} : ${time.second}`)