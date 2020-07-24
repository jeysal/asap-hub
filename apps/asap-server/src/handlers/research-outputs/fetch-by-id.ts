import Joi from '@hapi/joi';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { framework as lambda } from '@asap-hub/services-common';

import validateUser from '../../utils/validate-user';
import ResearchOutputs from '../../controllers/research-outputs';

export const handler: APIGatewayProxyHandler = lambda.http(
  async (request: lambda.Request): Promise<lambda.Response> => {
    await validateUser(request);

    const paramsSchema = Joi.object({
      id: Joi.string().required(),
    }).required();

    const params = lambda.validate('params', request.params, paramsSchema) as {
      id: string;
    };

    const researchOutputs = new ResearchOutputs();
    const outputs = await researchOutputs.fetchUserResearchOutputs(params.id);

    return {
      statusCode: 200,
      payload: outputs,
    };
  },
);