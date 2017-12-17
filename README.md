# csdb
Codesmith Dashboard

The Dashboard site is running on:
- `node v8.9.3`

## How to get started
````
npm install
````

## How to run

Weback Dev Server (note this does not run the API server presently)
````
npm run dev:hot
````    
Server in Dev mode
````
npm run dev
````
Production
````
npm start
````

## Configuration
Config files are contained in csdb/config
These files cascade from default -> (development|production) -> etc

Check out the [node-config docs](https://github.com/lorenwest/node-config/wiki/Configuration-Files) for more info  

