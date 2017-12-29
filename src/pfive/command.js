const program = require("commander");
const generator = require("./generator");
const {
    version,
    description
} = require("../../package.json");

module.exports.run = () => {

    program
        .version(version)
        .description(description);

    program
        .option('-v, --version', 'Show version', version)
        .option('-o, --offline', "Offline installer, use with 'install' command");


    program
        .command("help")
        .alias("h")
        .description("Show this help message")
        .action(() => program.help())

    program
        .command("init")
        .description("Create pfive.json file")
        .action(() => generator.init(process.cwd()))

    program
        .command("install")
        .alias("i")
        .description("Install libraries from pfive.json")
        .action(() => generator.install(process.cwd(), program.offline))

    program
        .command("lib")
        .alias("l")
        .description("Edit pfive.json libraries")
        .action(() => generator.addLib(process.cwd()))

    program
        .command("prune")
        .alias("p")
        .description("Remove unused libraries")
        .action(() => generator.cleanUnusedLib(process.cwd()))

    program.parse(process.argv);

    if (program.args.length < 1) {
        console.log(`pfive version: ${program.version()}, 'pfive -h' for help`);
    }
}
