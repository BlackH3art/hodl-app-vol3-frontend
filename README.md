# hoDl! app

![](https://github.com/BlackH3art/hodl-app-vol3-backend/blob/main/src/images/thumbnail.jpg "thumbnail")

Application is deployed on: \
https://www.hodl-app.xyz/

> Note: use the link above for secure ```https``` connection\
For whatever reason installed SLL certificate dosn't work on this domain without ```www```.


Application is using Nestjs backend application as an API service for external calls deployed on:\
https://hodlapp-vol3.herokuapp.com/

Backend repository:\
https://github.com/BlackH3art/hodl-app-vol3-backend

-----

## About

This application is meant to help crypto traders manage their portfolio, as well as opened positions and transactions history.\
It tracks current price of given crypto asset based on https://coinmarketcap.com/ API.

**hoDl! app** consists of three segments:
- Positions
- Wallet
- History


### Positions
Where you can track current price and state for each and every buy transaction u made.\
Application calculates:
- percent PNL
- dolar PNL
- your total investment
- how much is it currently worth
- amount of crypto


### Wallet
Wallet aggregates your multiple positions, in case if you are interested in DCA (dolar cost average) strategies.\
Application calculates:
- average price you bought each and every crypto
- total percent PNL
- total dolar PNL
- your total investment
- how much is it currently worth
- atotal mount of crypto


### History
Keeps track of your each transaction buying, selling\
Stored data:
- date when position was opened
- date when positions was closed,
- dolar PNL from selling transactions
- amount of crypto bought and sold

-----

## Try this app:
To try this app:
- go to https://www.hodl-app.xyz
- create your account
- add first transaction filling up the form

`Ticker` - is the cryptocurrency symbol (e.g BTC)\
`Amount` - what is the amount of crypto you bought (e.g 2 for 2BTC)\
`Price` - what is the price that you bought it for.\
Example:

You bought two Bitcoins at the price of 15000$\
Application will calculate that you now have 2BTC and they are worth 30000$\

### Access
Backend application is restricted to two domains:
```javascript
  app.enableCors({
    origin: ['https://hodl-app.xyz', 'https://www.hodl-app.xyz'],
    credentials: true
  });
```
So you can test this application only by using this deployed frontend.
But also you can clone frontend repository as well as backend repository, configure your own ```.env``` and run it locally.

Clone frontend:
```
git clone https://github.com/BlackH3art/hodl-app-vol3-frontend
```
You will need to create file `./private/constants.ts` with your Syncfusion key for the stats to display properly:
```js
export const SYNCFUSION_KEY = 'Your Syncfusion key';
```

Then:
```
npm install
```
Then:
```
npm run dev
```


----
