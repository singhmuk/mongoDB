const cors = require('cors');
const express = require('express');

//Secret key
const stripe = require('stripe')('sk_test_51He1P4Jz7nbfLVoYjEiuLJJXUkw3yFMOLRXLm8Ons2fnzuwfoFLzCyncHIubREzUs60yiDPNvSxZltanq41RyLEi00vKugjwhC');
const uuid = require('uuid');

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('It is working')
})

app.post('/payment', (req, res) => {
    const { product, token } = req.body;
    console.log('Products', product);
    console.log('Price', product.price);
    const idempontencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchase of product.name`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, { idempontencyKey })
    })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
})


app.listen(5000, () => console.log('Started on port 5000'))