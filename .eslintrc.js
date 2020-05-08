module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
      "semi": [2, 'never'],
      "import/no-extraneous-dependencies": ['error', { devDependencies: true }],
      "max-len": "off", 
      "import/prefer-default-export" : "off",
      "no-use-before-define": "off",
      'no-plusplus': 'off'
    },
    "env": {
      "browser" : true,
      "node" : true
    }
};