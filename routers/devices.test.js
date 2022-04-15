import initApp from '../app';
import { jest } from '@jest/globals';
import request from 'supertest';

// Mock function and app setup
const getDevice = jest.fn();
const getDevices = jest.fn();
const addDevice = jest.fn();
const app = initApp({ getDevice, getDevices, addDevice });

// Reusable test-data
const id = 2;

const mockDevicesData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

describe('GET /devices', () => {
  beforeEach(async () => {
    getDevices.mockReset();
  });

  test('status code is 200', async () => {
    getDevices.mockResolvedValue(mockDevicesData);
    const response = await request(app).get('/devices');
    expect(response.statusCode).toBe(200);
  });

  test('status code is 404 if devices cannot be found', async () => {
    getDevices.mockResolvedValue([]);
    const response = await request(app).get('/devices');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('No devices exist in the database.');
  });

  test('getDevices is only called once', async () => {
    getDevices.mockResolvedValue(mockDevicesData);
    await request(app).get('/devices');
    expect(getDevices.mock.calls.length).toBe(1);
  });

  test('content-type header specifies json', async () => {
    getDevices.mockResolvedValue(mockDevicesData);
    const response = await request(app).get('/devices');
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  test('response body is an array of device objects', async () => {
    getDevices.mockResolvedValue(mockDevicesData);
    const response = await request(app).get('/devices');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  // plaform query filters results by parameter
  // available query filters results by parameter
});

describe('GET /devices/:id', () => {
  beforeEach(async () => {
    getDevice.mockReset();
  });

  test('status code is 200 when device is found', async () => {
    getDevice.mockResolvedValue({ id });
    const response = await request(app).get(`/devices/${id}`);
    expect(response.statusCode).toBe(200);
  });

  test('status code is 404 if device cannot be found', async () => {
    const response = await request(app).get(`/devices/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(
      `Device with ID ${id} could not be found.`
    );
  });

  test('content-type header specifies json', async () => {
    getDevice.mockResolvedValue({ id });
    const response = await request(app).get(`/devices/${id}`);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  test('response body contains an object with the id which was passed as the path parameter', async () => {
    for (let i = 0; i < 5; i++) {
      const id = i;
      getDevice.mockResolvedValue({ id });
      const response = await request(app).get(`/devices/${id}`);
      expect(response.body.id).toBe(id);
    }
  });

  test('getDevice is only called once', async () => {
    getDevice.mockResolvedValue({ id });
    await request(app).get(`/devices/${id}`);
    expect(getDevice.mock.calls.length).toBe(1);
  });

  test('getUser is called with id as the first parameter', async () => {
    getDevice.mockResolvedValue({ id });
    await request(app).get(`/devices/${id}`);
    expect(getDevice.mock.calls[0][0]).toBe(id.toString());
  });
});

describe('POST /devices', () => {
  // successful response status code is 201
  // content-type is specified as json
  // addDevice is called only once
  // malformed body results in 400 status code
  // empty
  // incorrect typing
  // invalid keys
  // invalid authentication credentials results in 401 status code
  //
});

describe('PUT /devices/:id', () => {
  // successful response status code is 201
  // content-type is specified as json
  // updateDevice is called only once
  // malformed body results in 400 status code
  // empty
  // incorrect typing
  // invalid keys
  // invalid authentication credentials results in 401 status code
  //
});
