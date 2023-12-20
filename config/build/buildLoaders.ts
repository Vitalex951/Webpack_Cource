import {ModuleOptions} from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import {buildBabelLoader} from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development'
    const isProd = options.mode === 'production'


    // лоадер для картинок (кроме свг)
    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    // лоадер для свг
    const svgrLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: '@svgr/webpack',

                // для того, чтобы можно было пропсами менять размер свг
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true
                                }
                            }
                        ]
                    }
                }
            }
        ],
    }

    const scssLoaderWithModule = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            }
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            // "style-loader",
            // заменили style-loader на MiniCssExtractPlugin
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,

            // Translates CSS into CommonJS
            // "css-loader",

            scssLoaderWithModule,

            // Compiles Sass to CSS
            "sass-loader",
        ],
    }

    //старый лоадеро
    // const tsLoader = {
    //     // ts-loader умеет работать с JSX
    //     // Если б мы не использовали тайпскрипт: нужен был бы babel-loader
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // }

    //Если вы хотите значительно ускорить компиляцию, вы можете установить этот флаг  transpileOnly: true. Однако многие преимущества, которые вы получаете от статической проверки типов между различными зависимостями в вашем приложении, будут потеряны. transpileOnly не ускорит компиляцию ссылок на проект.
    // убираем проверку типов при сборке (для проверки типов отдельным процессом, ставим плагин fork-ts-checker-webpack-plugin )
    // getCustomTransformers - добавили обновление страницы без перезагрузки в реальном времени
    const tsLoader = {
        // ts-loader умеет работать с JSX
        // Если б мы не использовали тайпскрипт: нужен был бы babel-loader
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
            transpileOnly: isDev,
            getCustomTransformers: () => ({
                before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
            }),
        }
    }

    const babelLoader = buildBabelLoader(options)

//порядок важен, так как все идет по очереди и на выходе получаем уже обработанные файлы
    return [
        assetLoader,
        scssLoader,
        // tsLoader,
        babelLoader,
        svgrLoader
    ]
}
