import app from './app';
import { config } from './utils/config';
import { API_PORT } from './utils/constants';

app.listen(API_PORT, () => {
  console.log(`API started on PORT: ${API_PORT}`);
  console.log(`URL: ${config.API_URL}`);
});
