const makeCandel = async (timeFrame, transactions, out) => {
    if (isNaN(Number(timeFrame))) throw "time frime should be a number"

    //set output timestamp to second or milisecond
    let _out
    { out === "ms" ? _out = 1000 : _out = 1 }
    //set default time frame to 1 minute
    { timeFrame ? timeFrame = timeFrame : timeFrame = 1 }


    // convert milisecond timestamp to second
    transactions.forEach(each => {
        if (isValidTimestamp(Number(each.timestamp)) !== true) throw `${each.timestamp} is not a valid timestamp`
        if (isNumeric(Number(each.amount) !== true) || !isNumeric(Number(each.price))) throw `all prices and amounts should be a numberic`
        { each.amount ? each.amount = each.amount : each.amount = 0 }
        each.timestamp = Number(each.timestamp.toString().slice(0, 10))
    })
    // geting start and end time from first and last transaction
    let from = transactions[0].timestamp,
        to = transactions[transactions.length - 1].timestamp

    sortTransactions = transactions.sort((a, b) => { return b.timestamp - a.timestamp }),
        timeLap = timeFrame * 60,
        //count how many candels we have base on from , to and time frame
        candelCount = Math.round((from - to) / timeLap),
        candelCountainer = []

    //creating empty candels container
    for (let index = 0; index <= candelCount; index++) {
        candelCountainer.push({
            startTime: from - (timeLap * index),
            endTime: from - (timeLap * (index + 1)) - 1,
            dataArray: []
        })
    }
    //putting each transaction to specified candel contaner base on timestamp
    transactions.forEach(transaction => {
        let index = candelCountainer.findIndex(each =>
            each.startTime >= Number(transaction.timestamp) &&
            each.endTime < Number(transaction.timestamp))
        if (index == -1) return
        return candelCountainer[index].dataArray.push(transaction)
    })
    // making candels from candel container
    let candels = []
    candelCountainer.forEach(each => {
        let datas = each.dataArray,
            open = 0,
            close = 0,
            high = 0,
            low = 0,
            candel_time = each.startTime,
            volume = 0

        datas.forEach((eachData, index) => {
            let { amount, price } = eachData
            price = Number(price)
            if (amount) {
                volume += amount
            }
            if (index === 0) {
                close = price
            }
            open = price
            if (Number(price) > Number(high)) {
                high = price
            }
            if (low == 0 || Number(price) < Number(low)) {
                low = price
            }

        })
        if (high !== 0 && low !== 0) { // removing empty candels
            return candels.push({
                open, close, high, low, time: candel_time * _out, volume
            })
        }
        return
    })
    return candels
}

//check time stamp

function isValidTimestamp(_timestamp) {
    const newTimestamp = new Date(_timestamp).getTime();
    return isNumeric(newTimestamp);
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = { makeCandel }