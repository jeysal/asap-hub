import {
  ResearchOutputResponse,
  ResearchOutputCreationRequest,
  ListResearchOutputResponse,
} from '@asap-hub/model';
import { Squidex } from '@asap-hub/services-common';

import { CMS } from '../cms';
import { CMSResearchOutput } from '../entities/research-outputs';
import { CMSTeam } from '../entities';

function transform(
  output: CMSResearchOutput,
  team?: CMSTeam,
): ResearchOutputResponse {
  const teamProps = team
    ? {
        team: {
          id: team.id,
          displayName: team.data.displayName.iv,
        },
      }
    : {};

  return {
    id: output.id,
    created: output.created,
    url: output.data.url?.iv || '',
    doi: output.data.doi?.iv || '',
    type: output.data.type.iv,
    title: output.data.title.iv,
    text: output.data.text?.iv || '',
    publishDate: output.data.publishDate?.iv,
    ...teamProps,
  } as ResearchOutputResponse;
}

export default class ResearchOutputs {
  cms: CMS;

  researchOutputs: Squidex<CMSResearchOutput>;

  teams: Squidex<CMSTeam>;

  constructor() {
    this.cms = new CMS();
    this.researchOutputs = new Squidex('research-outputs');
    this.teams = new Squidex('teams');
  }

  async create(
    id: string,
    name: string,
    output: ResearchOutputCreationRequest,
  ): Promise<ResearchOutputResponse> {
    const createdOutput = await this.cms.researchOutputs.create(
      id,
      name,
      output,
    );
    return transform(createdOutput);
  }

  async fetchById(id: string): Promise<ResearchOutputResponse> {
    const res = await this.researchOutputs.fetchById(id);
    const team = await this.teams.fetchOne({
      filter: {
        path: 'data.proposal.iv',
        op: 'eq',
        value: res.id,
      },
    });
    return transform(res, team);
  }

  async fetch({ page = 1, pageSize = 8 }): Promise<ListResearchOutputResponse> {
    const query = {
      take: pageSize,
      skip: (page - 1) * pageSize,
    };

    const res = await this.researchOutputs.fetch(query);
    const teams = res.items.length
      ? await this.teams.fetch({
          take: res.items.length,
          filter: {
            or: res.items.map((item) => ({
              path: 'data.proposal.iv',
              op: 'eq',
              value: item.id,
            })),
          },
        })
      : { items: [] };

    return {
      total: res.total,
      items: res.items.map((item) =>
        transform(
          item,
          teams.items.filter((t) => t.data.proposal?.iv[0] === item.id)[0],
        ),
      ),
    };
  }
}
