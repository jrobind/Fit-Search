# :muscle: Fit-Search

In an effort to learn ES6, React, and Redux, this is __Fit-Search__ - a simple personal trainer search application. My orginal intention was to build an SPA but the project has morphed into a more complex full-stack one, with an API backend built with Express and MongoDB.

## Features

You can sign up as a trainer or, alternatively, as a client searching for a trainer. Both account types are able to set up their own basic user profiles. However, each account type has it's own unique functionality. 

The main basis of the application revolves around the trainer search and review system. Clients are able to search for trainers across England, using specific search filters. Clients are encouraged to leave reviews on trainer pages. The review system helps clients place trust in well established, high quaility trainers that have been reviewed by other users. 

To keep the process as simple as possible, if clients decide they like a trainer and wish to highlight their interest, they can send the trainer a personal interest request. The trainers will recieve these requests on their own accounts and contact the clients going forward to organise initial consultations and taster sessions. For the trainers, the main focus of the application is the interest request functionality, which ultimately helps trainers to easily keep track of potential clientele.  

## Show me the demo!

See the application live here: https://fit-search.herokuapp.com/ (you may have to wait a few seconds for the application to wake-up).

Feel free to sign-up and play around. The auth is built using basic Passport local strategy so any fake email will do. Or, alternatively you can use these dummy accounts provided below:

### Trainer account

* Email: james@outlook.com
* password: fit123

### Client/user account

* Email: emma@outlook.com
* password: fit123

## Running the app

You can either download this repository or clone it by running:

```
git clone https://github.com/jrobind/Fit-Search
```

Install dependencies:

```
npm install
```

Next, you will need to set your own session secret in the __server.js file__. Additionally, you will also need to setup MongoDB locally within the __/models__ directory and paste your local db connection here:

```js
mongoose.connect(process.env.DATABASE_URL);
```     

lastly, to start the development server run:

```
npm node server.js
```

## Contributions

Please let me know of any issues/feature requests. Contributions great or small are always welcome!

## License

[MIT License](https://opensource.org/licenses/MIT)