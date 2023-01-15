import request from 'supertest';
import { server } from '../src/index';

describe('Some random case just to test the test', () => {
  it('do smth please', async () => {
    await request(server).get('/api/users').expect(200);
  });
});

afterAll((done) => {
  server.close();
  done();
});
