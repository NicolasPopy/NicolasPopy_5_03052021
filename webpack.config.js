const path = require('path');

module.exports = {
    mode: "production",
    entry: {
        app: "./src/js/index.js",
        produit: "./src/js/produit.js",
        validation: "./src/js/validation.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },

    module:{
        rules: [
            {   test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                    "style-loader",
                  // Translates CSS into CommonJS
                    "css-loader",
                  // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {   
                test: /\.(jpg|jpeg|png|ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,               
                use: [{
                loader: 'file-loader'
                }]
            }
            
        ]
    }
}