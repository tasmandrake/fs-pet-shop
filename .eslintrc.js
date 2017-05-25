module.exports = {
  extends: [
    'ryansobol/node',
    'ryansobol/es6',
    'airbnb'
  ]
};

// install all packages required
//
// npm info "eslint-config-airbnb@latest" peerDependencies
//
// npm install --save-dev eslint-config-airbnb eslint@^3.19.0 eslint-plugin-jsx-a11y@^5.0.3 eslint-plugin-import@^2.3.0 eslint-plugin-react@^7.0.1
//
// npm install -D eslint eslint-config-ryansobol
//
// touch .eslintrc.js
//
// copy into .eslintrc.js:
//     module.exports = {
//       extends: [
//         'ryansobol/node',
//         'ryansobol/es6',
//         'airbnb'
//       ]
//     };
//
// npm run lint pets.js
