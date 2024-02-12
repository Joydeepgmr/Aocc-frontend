# ReactJS + Webpack + Redux + React-router (Boilerplate Code)

<!-- Click [here](https://docs.cashfree.com/docs/react-native-integration) for more Documentation. -->

#### Requirements -

-   Node version 16 or higher.

#### Installation

```sh
1. Clone the Repo.
2. Delete the existing .git (hidden) folder completely.
3. Initialize a new git repository using - git init
3. Change the root favicon, index.html file content (Title, Description...etc) as per the client details.
4. Install all the project dependencies using - npm install or npm install --legacy-peer-deps
```

#### Dependencies -

-   [node-sass](https://www.npmjs.com/package/node-sass) - Preprocessor for UI styling.
-   [query-string](https://www.npmjs.com/package/query-string) - To parse query parameters.
-   [react-device-detect](https://www.npmjs.com/package/react-device-detect) - Conditional UI rendering based on user
    device (certain UI element show & hide w.r.t mobile vs desktop vs tablets), we can conditionally add inline css,
    className too, very useful in terms of responsive UI.
-   [react-helmet](https://www.npmjs.com/package/react-helmet) - To add page wise meta tags and other SEO specific
    details.
-   [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner) - To show custom loader spinner.
-   [redux](https://www.npmjs.com/package/redux) - for state management.
-   [react-redux](https://www.npmjs.com/package/react-redux) - React specific redux state management methods.
-   [react-router-dom](https://www.npmjs.com/package/react-router-dom) - For routing app to different pages

#### Run App -

-   npm rebuild node-sass (_Need to run this if **npm start** fails_)
-   npm start

#### Project directory structure

```
src
├── Assets
│   ├── Animations
│   ├── SEO
│   └── Videos
├── Components
│   ├── Button
│   ├── HrLine
│   ├── Input
│   └── Otp
├── Layouts
├── Redux
├── Styles
│   ├── css
│   └── sass
├── Views
│   ├── afterAuth
│   │   ├── Dashboard
│   │   │   └── Redux
│   │   └── Orders
│   └── beforeAuth
│       ├── Components
│       ├── Landing
│       └── Login
└── utils



1. Assets      ->  Contain all project's assets
2. Components  ->  All re-usable components will be places here in a folder along with its stylings (style.scss) and markup
3. Redux       ->  Root level redux content (Root reducer - merge all reducers along with store config)
4. Styles      ->  Global re-usable styles, sass mixins, variables, utils, animations...etc
5. Layouts     ->  Will contain responsive re-usable layouts.
6. Views       ->  Contain Actual UI Markup + Stylings + View specific Redux
7. Utils       ->  Contains utility functions....etc
```

##### Note

    View = Layout + Components
