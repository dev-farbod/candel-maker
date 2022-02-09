# candel-maker
API to generate candlestick chart data for any time period based on transactions data

## Installation

clone repo

```bash
git clone https://github.com/dev-farbod/candel-maker.git
```

clone to directori

```bash
cd candel-maker
```

Use the package manager [npm](https://nodejs.org/) to install dependencies.

```bash
npm install
``

run server

```bash
node index.js
```
server will be run on localhost:5050

## API refrenc

#### make candels

```http
  POST /candel
```
| Parameter               | Type              | Description                                           | default|
| :---------------------- | ----------------  | :-----------------------------------------------------|--------|
| `transactions`          | `array`           | **Required**. array of your transactions              |        |
| `time_frame`            | `number`          |  requested time frame (minute)                        |      1 |
| `output_timestamp_type` | `string (s / ms)` |  choose type of candels timestamp,second or milisecond|      s |

#### Example


```json
{
	"transactions":[
		{
			"timestamp":"1644394447",
			"price":"30",
			"amount":2
		},
			{
			"timestamp":1644394437,
			"price":20,
			"amount":2
		}
		],
		"time_frame":"2",
    "output_timestamp_type":"ms"
}

```

#### response

```json
{
    "status": true,
    "msg": "",
    "candels": [
        {
            "open": 20,
            "close": 301,
            "high": 301,
            "low": 20,
            "time": 1644394447000,
            "volume": 4
        }
    ]
}
```




