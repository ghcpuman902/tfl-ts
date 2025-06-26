import TflClient from '../src/index';
import dotenv from 'dotenv';
dotenv.config();

const client = new TflClient(); // will read appId and appKey from .env

const main = async () => {
 
  const tubeStatus = await client.line.getStatus({ modes: ['tube'] });
  console.dir(tubeStatus, { depth: null });
}

main().catch(console.error);
