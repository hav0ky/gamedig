// import axios from 'axios';
import express from 'express'
import { GameDig } from 'gamedig';
// import cron from 'node-cron';

const app = express()

app.use(express.json())

const getServers = async () => {
    let servers = []
    // cron.schedule('*/15 * * * * *', async () => {
    // const response = await axios.get('https://raw.githubusercontent.com/hav0ky/stuff/main/gamedig.json')

    const serverPromises = response.data.map(async (server) => {
        try {
            const qserver = await GameDig.query({
                type: 'counterstrike2',
                host: server.ip,
                port: server.port
            })
            return qserver;
        } catch (error) {
            // console.error(error)
            return null
        }
    });

    servers = (await Promise.all(serverPromises)).filter(server => server !== null);
    // });
}

// getServers()

app.post('/', async (req, res) => {

    const { ips } = req.body

    const serverPromises = ips.map(async (server) => {
        try {
            const qserver = await GameDig.query({
                type: 'counterstrike2',
                host: server.ip,
                port: server.port || 27015
            })
            return qserver;
        } catch (error) {
            // console.error(error)
            return null
        }
    });

    const servers = (await Promise.all(serverPromises)).filter(server => server !== null);

    res.json(servers).status(200)
})

app.listen(4000, () => {
    console.log('Server running on port 3000')
})