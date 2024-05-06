//import type {Config} from '@jest/types';
// Sync object
const config: any = {
  verbose: true,
  transform: {
  '^.+\\.tsx?$': 'ts-jest',
  },
};
export default config;