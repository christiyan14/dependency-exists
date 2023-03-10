import { dependencyExists } from "./dependency-exists.js";
import { DefaultColorsEnum, DependencyExistsWithTextOptions, TextColors } from './types.js';
import { Chalk } from "chalk";
const chalk = new Chalk();

let defaultColors: TextColors = {
    success: DefaultColorsEnum.success,
    error: DefaultColorsEnum.error,
    warn: DefaultColorsEnum.warn,
    info: DefaultColorsEnum.info,
};

export const dependencyExistsWithText = (
    packageName: string,
    options: DependencyExistsWithTextOptions = {
        success: {
            color: defaultColors.success,
            text: "",
            warn: {
                color: defaultColors.warn,
                text: "",
            },
            info: {
                color: defaultColors.info,
                text: "",
            },
        },
        error: {
            color: defaultColors.error,
            text: "",
            warn: {
                color: defaultColors.warn,
                text: "",
            },
            info: {
                color: defaultColors.info,
                text: "",
            },
        },
    }
) => {
    const chalkSuccess = chalk.hex(
        options.success?.color || defaultColors.success
    );

    const chalkError = chalk.hex(options.error?.color || defaultColors.error);

    if (dependencyExists(packageName)) {
        console.log(chalkSuccess(options.success?.text || "✔ Installed!"));

        if (options.success?.warn?.text) {
            const chalkWarn = chalk.hex(
                options.success?.warn?.color || defaultColors.warn
            );
            console.log(chalkWarn(`⚠ ${options.success?.warn.text}` || ""));
        }

        if (options.success?.info?.text) {
            const chalkInfo = chalk.hex(
                options.success?.info?.color || defaultColors.info
            );
            console.log(chalkInfo(`ℹ ${options.success?.info.text}` || ""));
        }
        return true;
    } else {
        console.log(chalkError(options.error?.text || "X Not installed"));

        if (options.error?.warn?.text) {
            const chalkWarn = chalk.hex(
                options.error?.warn.color || defaultColors.warn
            );
            console.log(chalkWarn(`⚠ ${options.error?.warn.text}` || ""));
        }

        if (options.error?.info?.text) {
            const chalkInfo = chalk.hex(
                options.error?.info.color || defaultColors.info
            );
            console.log(chalkInfo(`ℹ ${options.error?.info.text}` || ""));
        }
        return false;
    }
};
