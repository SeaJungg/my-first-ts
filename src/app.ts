import cron from 'node-cron';
import express from 'express';
import bodyParser from 'body-parser';
import { JsonDB, Config } from 'node-json-db';
import { getDailySummary } from './summary';
import router from './router';
import { responseMiddleware } from './middlewares';

const app = express();
app.use(bodyParser.json());



// Add the response middleware
app.use(responseMiddleware as any);

app.use(router);

cron.schedule('*/10 * * * * *', async () => {
    try {
        const db = new JsonDB(new Config('./transactionDB', true, false, '/'));
        const summary = await getDailySummary();
        console.log('Daily Summary:', summary);
        // Save summary to a separate table or perform any other desired action
    } catch (error) {
        console.error('Error generating daily summary:', error);
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});