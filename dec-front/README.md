# The Front-end Client of Decryptio Exchange Application

## Requirements in order to run the application
* Some sort of a Code Editor Software ( examples: Visual Studio Code, Atom, NetBeans ...)
* Clone the project from this repository and save it on the local device.
* Internet Access 
* Create an account on Rapid Api Website - Subscribe to CoinRanking and Bing News Search Api
* NPM Installed

## How to run the Back-end Server of Decryptio Exchange Application
- Once the project got cloned and saved on a local device - open the project in your favourite code editor.
- Input the command npm install into the terminal and run it - this would install all the needed node modules for the application
- Create a file called .env in the main directory and add the following :
- REACT_APP_RAPIDAPI_KEY =  'Your own Rapid API key goes here'
  REACT_APP_CRYPTO_API_URL = 'https://coinranking1.p.rapidapi.com'
  REACT_APP_NEWS_API_URL = 'https://bing-news-search1.p.rapidapi.com'
  ESLINT_NO_DEV_ERRORS=true
- Next step is to change the API_URL in services folder files AuthorizeUser.js, exchange.service.js and user.service.js to the one you set up on the Back-end server of the application ( Back-end server of the application is provided in this repository)
- Final step run - npm start and enjoy!

## Technologies used for the creation of the application
- React.js
- Redux.js
- CoinRanking API
- Bing News Search Api
- CoinGecko Api
- ChartJS
- Ant Design

## The Dependencies used
- @ant-design/plots
    @emotion/react
    @emotion/styled
    @fontsource/roboto
    @reduxjs/toolkit
    @testing-library/jest-dom
    @testing-library/react
    @testing-library/user-event
    ant-design
    antd
    aos
    axios
    chart.js
    date-fns
    enquire-js
    html-react-parser
    jwt-decode
    millify
    moment
    prop-types
    rc-queue-anim
    rc-scroll-anim
    rc-tween-one
    react
    react-bootstrap
    react-chartjs-2
    react-css-modules
    react-dom
    react-icons
    react-infinite-scroll-component
    react-minimal-pie-chart
    react-redux
    react-router-dom
    react-scripts
    react-sparklines
    react-spinners
    react-spring
    react-tradingview-widget
    redux
    redux-devtools-extension
    redux-thunk
    responsive-ant-menu
    rxjs
    typescript
    web-vitals

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
