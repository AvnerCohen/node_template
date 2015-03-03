# Template for a Node.js service

## Libararies being used

* naught
* express
* graylog2
* mongodb
* statsd-client
* naught
* mocha
* should
* supertest

## Re use process

````sh
git clone git@github.com:AvnerCohen/node_template.git new_service_name
cd new_service_name
rm -rf ./git
git init && git add . && git commit -am "Initial commit for node service"
````

##NPM Application lifecycle commands

Prefix the command with **NODE_ENV** to define environment for the run.
Default is development.

***Start***

````sh
NODE_ENV=production npm start
````

***Stop***

````sh
NODE_ENV=development npm stop
````

***Deploy / Restart***

````sh
NODE_ENV=production npm run-script deploy
````

##NPM Additional Commands Available

***Run Tests***

````sh
npm test
````

***Run Integration Tests***

````sh
mocha ./test/integration
````

***Run Both Unit Tests and integration tests***

````sh
npm run-script test-all
````


***Check Status***

````sh
npm run-script status
````
