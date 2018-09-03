module.exports = {
    "env": {
        // "browser": true,
        "commonjs": true,
        "es6": true
    },
    // 解决eslint不识别async语法的报错
    "parser": "babel-eslint",
    // "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2016,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        // "quotes": [
        //     "error",
        //     "double"
        // ],
        // "semi": [
        //     "error",
        //     "never"
        // ]
    }
};