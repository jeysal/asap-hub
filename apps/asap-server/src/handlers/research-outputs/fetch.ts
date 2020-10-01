import Joi from '@hapi/joi';
import { framework as lambda } from '@asap-hub/services-common';

import validateUser from '../../utils/validate-user';
import ResearchOutputs from '../../controllers/research-outputs';
import { Handler } from '../../utils/types';

const querySchema = Joi.object({
  take: Joi.number(),
  skip: Joi.number(),
}).required();

export const handler: Handler = lambda.http(
  async (request: lambda.Request): Promise<lambda.Response> => {
    await validateUser(request);

    const query = lambda.validate('query', request.query, querySchema) as {
      take: number;
      skip: number;
    };

    const researchOutputs = new ResearchOutputs();
    const outputs = await researchOutputs.fetch(query);

    return {
      statusCode: 200,
      payload: outputs,
    };
  },
);
