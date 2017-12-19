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
These files cascade from: default -> (development|production) -> hostname-(development|production) -> etc
So if you have the following files in the config directory of your project:
````
default.json
development.json
myhostname-development.json
production.json
````
... and you ran in `development` mode, files would be processed in this order:
````
default.json
development.json
myhostname-development.json
````
... with any key:values in the later files overwriting key:values in earlier files.

Check out the [node-config docs](https://github.com/lorenwest/node-config/wiki/Configuration-Files) for more info  

