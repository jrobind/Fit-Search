# :muscle: Fit-Search

In an effort to learn ES6, React, and Redux, this is __Fit-Search__ - a personal trainer search application. My orginal intention was to build a simple SPA but the project has morphed into a more complex full-stack one, with an API backend built using Express and MongoDB.

## Features

* __Create User Profiles__: You can sign up as a trainer or, alternatively, as a user/client searching for a trainer. Both account types are able to set up their own basic user profiles. However, each account type has it's own unique functionality. 

* __Search and Review__: The main basis of the application revolves around the trainer search and review system. Users are able to search for trainers across England, using specific search filters. Users are encouraged to leave reviews on trainer pages. The review system helps users place trust in well established, high quaility trainers that have been reviewed by others. 

* __Register Interest__: If users decide they like a trainer and wish to highlight their interest, they can send the trainer a personal interest request. The trainers will recieve these requests on their own accounts and contact the users going forward to organise initial consultations and taster sessions. For the trainers, the interest request functionality helps them to easily keep track of potential clientele.  

## Show me the demo!

See the application live here: https://fit-search.herokuapp.com/ (you may have to wait a few seconds for the application to wake-up).

Feel free to sign-up and play around. The auth is built using basic Passport local strategy so any fake email will do. Or, alternatively you can use these dummy accounts provided below:

### Trainer account

* Email: james@outlook.com
* Password: fit123

### Client/user account

* Email: emma@outlook.com
* Password: fit123

## Running the app

You can either download this repository or clone it by running:

```
git clone https://github.com/jrobind/Fit-Search
```

Install dependencies:

```
npm install
```

Next, you will need to set your own session secret in the `server.js` file. Additionally, you will also need to setup MongoDB locally on your own computer or via a third-party provider. Once you have your database URL, go to the `index.js` file within the `/models` directory and paste your URL here:

```js
mongoose.connect(/* database URL */);
```     

lastly, to start the development server run:

```
node server.js
```

## Contributions

Please let me know of any issues/feature requests. Contributions great or small are always welcome!

## License

[MIT License](https://opensource.org/licenses/MIT)