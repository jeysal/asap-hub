import { Squidex } from '@asap-hub/squidex';
import {
  ListNewsAndEventsResponse,
  NewsOrEventResponse,
} from '@asap-hub/model';

import { CMSNewsAndEvents, parseNewsAndEvents } from '../entities';

export default class ResearchOutputs {
  newsAndEvents: Squidex<CMSNewsAndEvents>;

  constructor() {
    this.newsAndEvents = new Squidex('news-and-events');
  }

  async fetch(options: {
    take: number;
    skip: number;
  }): Promise<ListNewsAndEventsResponse> {
    const { total, items } = await this.newsAndEvents.fetch({
      ...options,
      filter: {
        path: 'data.type.iv',
        op: 'ne',
        value: 'Training',
      },
      sort: [{ order: 'descending', path: 'created' }],
    });

    return {
      total,
      items: items.map(parseNewsAndEvents),
    };
  }

  async fetchById(id: string): Promise<NewsOrEventResponse> {
    const result = await this.newsAndEvents.fetchById(id);
    return parseNewsAndEvents(result);
  }
}
