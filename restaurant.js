require('dotenv').config();
const express = require('express');
const http = require('http');

require('./kitchen');
const { placeOrder } = require('./waiter');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("😋 We are serving freshly cooked food 🍲");
});

//with queue processing
app.post('/order', (req, res) => {
    let order = {
        dish: req.body.dish,
        qty: req.body.qty,
        orderNo: Date.now().toString(36)
    }

    if (order.dish && order.qty) {
        placeOrder(order)
            .then(() => res.json({ done: true, message: "Your order has been received and  will be ready in a while" }))
            .catch(() => res.json({ done: false, message: "Your order could not be placed" }));
    } else {
        res.status(422);
    }
});


//without queue processing to see difference
/***
 * 
 this is going to run until the server resolves the callback, meaning as long as the request takes, 
 the client will be 
 waiting for the rrsponse which is not great at all.
 */
app.post('/order-legacy', (req, res) => {
    let order = {
        dish: req.body.dish,
        qty: req.body.qty,
        orderNo: Date.now().toString(36)
    }
    if (order.dish && order.qty) {
        setTimeout(() => console.log("Getting the ingredients ready... 🥬 🧄 🧅 🍄"), 1000);
        setTimeout(() => console.log(`🍳 Preparing ${order.dish}`), 1500);
        setTimeout(() => {
            console.log(`🧾 Order ${order.orderNo}: ${order.dish} ready`);
            res.json({ done: true, message: `Your ${order.qty}x ${order.dish} is ready` })
        }, order.qty * 5000);
    } else {
        console.log("Incomplete order rejected");
        res.status(422).json({ done: false, message: "Your order could not be placed" });
    }
});

// Create and start the server
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Restaurant open at:${PORT}`);
});