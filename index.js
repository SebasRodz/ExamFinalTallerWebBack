const express = require("express");
const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51HQ979HQf3hGzTFB9G75stlngWnJhQJe8JmORJoVMh5iAlWsfrsso9aIwOpxxgZQEXm15cjqHSy9FOQcqr9JLdop00LJqtkvD3"
);

const cors = require("cors");

const app = express();

app.use(cors({ origin: "https://examfinal-taller-back.herokuapp.com/" }));
app.use(express.json());

//lo que llega procedente del frontend.
app.post("/api/checkout", async (req, res) => {
  console.log(req.body);
  res.send("recibido");
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      description: "Basket of products",
      payment_method: id,
      confirm: true,
    });

    console.log(payment);

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {
    return res.json({ message: error.raw.message });
  }
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
