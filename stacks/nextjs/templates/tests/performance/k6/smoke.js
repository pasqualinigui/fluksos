import http from 'k6/http';
import { sleep } from 'k6';
import { expect } from 'https://jslib.k6.io/k6-testing/0.6.1/index.js';

export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const res = http.get('http://localhost:3000');
  expect(res.status).toBe(200);
  sleep(1);
}
