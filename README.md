# kf-test

## Installation
Note, this application assumes you have Node.js and NPM installed on your system.

After cloning the repository:
```bash
cd kf-test
npm install
```

To run tests:
```bash
npm run test
```

To build:
```bash
npm run build
```

To run:
```bash
npm run start <siteId> <startDate> <endDate>
```

## What I did

My initial approach was set up the requests for the APIs. I used the Axios library as my client and had set up a config file with the API key and base URL. Where the site ID and body were required, these would be passed through as parameters.

With that set up, I moved to working on the business logic. Filters were a theme here, so I created some unit tests to filter via ids and dates and then wrote the code for it. I also added some validation for those values. 

As this is typescript, I took advantage of the type system and converted the models in the yaml file into Types. This added an extra layer of security to ensure our data is correct.

With those in place I made the main file which would run through the steps in sequence and result in making a post request with the enhanced outages.

There is an intergration test that runs through the provided scenario. 