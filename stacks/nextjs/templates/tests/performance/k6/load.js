import http from 'k6/http';
import { sleep } from 'k6';
import { expect } from 'https://jslib.k6.io/k6-testing/0.6.1/index.js';

export const options = {
  stages: [
    { duration: '30s', target: 50 },  // simulate ramp-up of traffic from 1 to 50 users over 30s
    { duration: '1m', target: 50 },   // stay at 50 users for 1m
    { duration: '30s', target: 0 },   // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

export default function () {
  const res = http.get('http://localhost:3000');
  expect(res.status, 'response status').toBe(200);
  sleep(1);
}
