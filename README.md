# candel-maker
API to generate candlestick chart data for any time period based on transactions data

## Installation

clone repo

```bash
git clone https://github.com/dev-farbod/candel-maker.git
```

Use the package manager [npm](https://nodejs.org/) to install dependencies.

```bash
npm install
```

clone to directori

```bash
cd candel-maker
```

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
| Parameter               | Type              | Description                                           | default     |
| :---------------------- | ----------------  | :-----------------------------------------------------|-------------|
| `transactions`          | `array`           | **Required**. array of your transactions              |             |
| `time_frame`            | `number`          |  request time frame (minute)                          |      1      |
| `output_timestamp_type` | `string (s / ms)` |  choose type of candels timestamp,second or milisecond|      s      |



