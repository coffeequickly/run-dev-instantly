import dotenv from 'dotenv';
import path from "path";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config({
    path : '.env'
});

if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

export default {
    port: parseInt(process.env.SERVER_PORT, 10),
    url : '',
    _tmp : path.join(path.dirname(require.main.filename), process.env._TMP + '/'),
    token : process.env.GITHUB_TOKEN
};