import path from 'path';
import baseConfig from './base.config';

export default baseConfig({
  input: {
    app: [path.join(__dirname, '../src/web/index')]
  },
  output: {
    path: path.join(__dirname, '../www')
  },
  globals: {
    'process.env': {
      NODE_ENV: '"production"'
    }
  }
});
