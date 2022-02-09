const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const { makeCandel } = require("./helper");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


app.post("/candel", async (req, res) => {

    let {
        transactions,//array of transactions
        time_frame,// time frame or resolution (minute)
        output_timestamp_type // candels timeframe (s or ms)
    } = req.body

    try {
        let candels = await makeCandel(time_frame, transactions, output_timestamp_type)
        res.json({
            status: true,
            msg: "",
            candels
        })
    }
    catch (err) {
        res.json({
            status: false,
            msg: "check your inputs",
            err,
            candels: []
        })
    }

})

app.listen(5050,console.log("\n///////// API Running on port 5050 /////////"))