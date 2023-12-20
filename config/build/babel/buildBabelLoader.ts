import {BuildOptions} from "../types/types";
import {removeDataTestIdBabelPlugin} from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader({mode}: BuildOptions) {
    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const plugins = []

    if(isProd) {
        // свой кастомный плагин, для удаления тестовых пропсов
        plugins.push([
            removeDataTestIdBabelPlugin,
            {
                props: ['data-testId']
            }
        ])
    }

    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",

            // СОЗДАЛИ ФАЙЛ babel.config.json и автоматически лоадер его подхватывает
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-typescript",
                    [
                        "@babel/preset-react",
                        {
                            runtime: isDev ? 'automatic' : 'classic'
                        }
                    ]
                ],
                plugins: plugins.length > 0 ? plugins : undefined
            }
        }
    }
}
