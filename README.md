### in-order  to use this repository you need to set up the env variables to connect to redis client

You can either do that by using the cloud service or local.

### Run the application and open up postman and go to [server url](http://localhost:5000/order) to make a request and look at your console to see results. Try make as many request as possible to see the magic

The request body should look like this :

    {
    "dish":"Beans 🥗",
    "qty":"20"
    }

### You are also provided with another [endpoint](http://localhost:5000/order-legacy) to show you the difference. This actuallyblocks the main thread and the client will only receive the response after the server has finished executing the task. This means that no request can be made to this endpoint until the existing one resolves.

Happy Coding 🍕🍕