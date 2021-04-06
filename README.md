# Mechanical Keyboard Switches

This project should list all mechanical keyboard switches that I've know of.
This is only that backend that you'll be made using [Deno](https://deno.land) and deployed on [Deno Deploy](https://deno.com/deploy).
This project is used for learning purposes.

## Installation

You must have [Deno](https://deno.land/#installation) installed locally and [deployctl](https://deno.com/deploy/docs/running-scripts-locally).

We also use [FaunaDB](https://fauna.com) as our database, so you need to create an account and create you API Key.
Then you can create a collection using the `schema.gql` file.

## How to Run

You can follow [this](https://deno.com/deploy/docs/tutorial-faunadb) guide on Deno Deploy on how to use FaunaDB and running locally the project.
But you can run with the following command:

```sh
FAUNA_SECRET=<YOUR_SECRET_KEY> deployctl run --libs=ns,fetchevent app.ts
```

After that, you can test it adding a switch into with the following `curl`:

```sh
curl "http://localhost:8080/switches" \
  -H "content-type: application/json" \
  --data '{
    "name": "Cherry MX Blue",
    "type": "Clicky",
    "brand": "Cherry",
    "compatibility": "MX",
    "actuationForce": "60cN",
    "pcbMounted": ""
  }'
```

And to recover all key switches registered:

```sh
curl "http://localhost:8080/switches" \
  -H "content-type: application/json"
```
