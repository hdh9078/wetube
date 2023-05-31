const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path")

const BASE_JS = "./src/client/js/"

module.exports = {
    entry: {
        videoPlayer: BASE_JS + "videoPlayer.js",
        main: BASE_JS + "main.js",
        recorder: BASE_JS + "recorder.js",
        commentSection: BASE_JS + "commentSection.js",
    },
    plugins: [
        new MiniCssExtractPlugin({
        filename: "css/styles.css",
    })
],
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "assets"),
        clean:true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", {targets: "defaults"}]],
                    },
                },
            },
            {
                test:/\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], //webpack은 뒤에서부터 시작한다. sass로 scss->css로 변환
            },
        ],
    },
};