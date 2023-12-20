import webpack from "webpack";
import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const {mode, port, paths} = options
    const isDev = mode === 'development'
    const isProd = mode === 'production'

    return {
        mode: mode ?? 'development',

        // точка входа в приложение
        entry: paths.entry,

        // куда происходит сборка
        output:
            {
                path: paths.output,

                // избегаем кэширование в браузере
                filename:
                    '[name].[contenthash].js',
                clean:
                    true
            },

        plugins: buildPlugins(options),

        // лоадеры, которые обрабатывают файлы с разными расширениями
        module:
            {
                rules: buildLoaders(options)
            },


        // указали разрешенные расширения с исходным кодом
        resolve: buildResolvers(options),

        // для того чтобы при разработке указывало место ошибки (погуглить и выбрать для прода и дева, что подходит)
        // devtool: isDev ? 'inline-source-map' : 'source-map',

        devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',



        devServer: isDev ? buildDevServer(options) : undefined,

    }
}
