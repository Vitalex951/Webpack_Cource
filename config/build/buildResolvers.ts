import {Configuration} from 'webpack'
import {BuildOptions} from "./types/types";

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],

        // для того, чтобы использовать импорт через @/
        alias: {
            '@': options.paths.src
        }
    }
}
