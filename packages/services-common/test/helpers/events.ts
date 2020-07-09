import { APIGatewayEvent } from 'aws-lambda';

export const apiGatewayEvent = (event: Object): APIGatewayEvent => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    httpMethod: 'GET',
    path: '/api',
    pathParameters: null,
    queryStringParameters: null,
    resource: '/api',
    ...event,
    body:
      typeof event.body === 'object'
        ? JSON.stringify(event.body || {})
        : event.body,
  };
};
