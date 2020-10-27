import nock from 'nock';
import { APIGatewayProxyResult } from 'aws-lambda';
import { config as authConfig } from '@asap-hub/auth';

import { buildGraphQLQueryFetchUsers } from '../../../src/controllers/users';
import { handler } from '../../../src/handlers/users/fetch';
import { cms } from '../../../src/config';
import { apiGatewayEvent } from '../../helpers/events';
import { identity } from '../../helpers/squidex';
import * as fixtures from './fetch.fixtures';

describe('GET /users', () => {
  beforeAll(() => {
    identity();
  });

  afterEach(() => {
    expect(nock.isDone()).toBe(true);
  });

  test('returns 200 when no users exist', async () => {
    nock(`https://${authConfig.domain}`).get('/userinfo').reply(200);
    nock(cms.baseUrl)
      .post(`/api/content/${cms.appName}/graphql`, {
        query: buildGraphQLQueryFetchUsers(),
      })
      .reply(200, {
        data: {
          queryUsersContentsWithTotal: {
            total: 0,
            items: [],
          },
        },
      });

    const result = (await handler(
      apiGatewayEvent({
        httpMethod: 'get',
        headers: {
          Authorization: `Bearer token`,
        },
      }),
    )) as APIGatewayProxyResult;

    const body = JSON.parse(result.body);
    expect(result.statusCode).toStrictEqual(200);
    expect(result.body).toBeDefined();
    expect(body).toStrictEqual({
      items: [],
      total: 0,
    });
  });

  test('returns 200 when searching users by name - should allow filter as string', async () => {
    nock(`https://${authConfig.domain}`).get('/userinfo').reply(200);

    const filter =
      "data/teams/iv/role eq 'Lead PI' and" +
      " ((contains(data/displayName/iv, 'first')" +
      " or contains(data/firstName/iv, 'first'))" +
      ' and' +
      " (contains(data/displayName/iv, 'last')" +
      " or contains(data/firstName/iv, 'last')))";

    nock(cms.baseUrl)
      .post(`/api/content/${cms.appName}/graphql`, {
        query: buildGraphQLQueryFetchUsers(filter),
      })
      .reply(200, fixtures.response);

    const result = (await handler(
      apiGatewayEvent({
        httpMethod: 'get',
        queryStringParameters: {
          search: 'first last',
          filter: 'Lead PI',
        },
        headers: {
          Authorization: `Bearer token`,
        },
      }),
    )) as APIGatewayProxyResult;

    const body = JSON.parse(result.body);
    expect(result.statusCode).toStrictEqual(200);
    expect(body).toStrictEqual(fixtures.expectation);
  });

  test('returns 200 when searching users by name', async () => {
    nock(`https://${authConfig.domain}`).get('/userinfo').reply(200);

    const filter =
      "data/teams/iv/role eq 'Lead PI' or " +
      "data/teams/iv/role eq 'anotherFilter' and" +
      " ((contains(data/displayName/iv, 'first')" +
      " or contains(data/firstName/iv, 'first'))" +
      ' and' +
      " (contains(data/displayName/iv, 'last')" +
      " or contains(data/firstName/iv, 'last')))";

    nock(cms.baseUrl)
      .post(`/api/content/${cms.appName}/graphql`, {
        query: buildGraphQLQueryFetchUsers(filter),
      })
      .reply(200, fixtures.response);

    const result = (await handler(
      apiGatewayEvent({
        httpMethod: 'get',
        queryStringParameters: {
          search: 'first last',
          filter: 'Lead PI,anotherFilter',
        },
        headers: {
          Authorization: `Bearer token`,
        },
      }),
    )) as APIGatewayProxyResult;

    const body = JSON.parse(result.body);
    expect(result.statusCode).toStrictEqual(200);
    expect(body).toStrictEqual(fixtures.expectation);
  });

  test('returns 200 with the results from the requested page', async () => {
    nock(`https://${authConfig.domain}`).get('/userinfo').reply(200);

    nock(cms.baseUrl)
      .post(`/api/content/${cms.appName}/graphql`, {
        query: buildGraphQLQueryFetchUsers('', 8, 8),
      })
      .reply(200, {
        data: {
          queryUsersContentsWithTotal: {
            total: 0,
            items: [],
          },
        },
      });

    const result = (await handler(
      apiGatewayEvent({
        httpMethod: 'get',
        headers: {
          Authorization: `Bearer token`,
        },
        queryStringParameters: {
          take: '8',
          skip: '8',
        },
      }),
    )) as APIGatewayProxyResult;

    const body = JSON.parse(result.body);
    expect(result.statusCode).toStrictEqual(200);
    expect(result.body).toBeDefined();
    expect(body).toStrictEqual({
      items: [],
      total: 0,
    });
  });
});
