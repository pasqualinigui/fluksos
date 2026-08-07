import http from 'k6/http';
import { sleep } from 'k6';
import { expect } from 'https://jslib.k6.io/k6-testing/0.6.1/index.js';
import tracing from 'k6/experimental/tracing';

const client = new tracing.Client({
  propagator: 'w3c',
});

export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const req = {
    method: 'GET',
    url: 'http://localhost:3000',
  };
  const res = client.request(req);
  expect(res.status).toBe(200);
  sleep(1);
}
