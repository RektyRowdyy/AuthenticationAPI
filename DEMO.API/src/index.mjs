import dotenv from 'dotenv';
import { app } from './app.mjs';
import connectDb from './db/index.mjs'

dotenv.config({
    path: './env'
});

connectDb()
.then(() => {
    try {

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at PORT: ${process.env.PORT}`);
        })

    } catch (error) {

        app.on("error", (err) => {
            console.log(`Express failed!!! ${err}`);
            throw err;
        })
        
    }
})
.catch((err) => {
    console.log(`Mongo connection failed`, err);
})