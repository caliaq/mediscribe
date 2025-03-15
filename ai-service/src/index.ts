import Application from "./bootstrap/app";

const args = process.argv.slice(2);
var envType = args[0];

if (!envType) {
    envType = "dev";
}

const app: Application = new Application(envType);

app.run();