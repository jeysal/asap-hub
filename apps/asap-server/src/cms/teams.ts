import { Base, BaseOptions } from '@asap-hub/services-common';
import { CMSTeam } from '../entities/team';

interface TeamCreationRequest {
  displayName: string;
  applicationNumber: string;
  projectTitle: string;
  projectSummary: string;
  tags: string[];
}

export default class Teams extends Base {
  constructor(CMSConfig: BaseOptions) {
    super(CMSConfig);
  }

  create(team: TeamCreationRequest): Promise<CMSTeam> {
    return this.client
      .post<CMSTeam>('teams', {
        json: {
          displayName: {
            iv: team.displayName,
          },
          applicationNumber: {
            iv: team.applicationNumber,
          },
          projectTitle: {
            iv: team.projectTitle,
          },
          projectSummary: {
            iv: team.projectSummary,
          },
          tags: {
            iv: team.tags,
          },
        },
        searchParams: { publish: true },
      })
      .json();
  }

  async fetchById(id: string): Promise<CMSTeam> {
    return this.client.get<CMSTeam>(`teams/${id}`).json();
  }
}