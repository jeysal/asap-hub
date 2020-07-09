import Boom from '@hapi/boom';
import Debug from 'debug';
import path from 'path';
import url from 'url';
import Intercept from 'apr-intercept';
import { CMS } from '../cms';
import * as auth0 from '../entities/auth0';
import { CreateUser } from '../cms/users';
import { User } from '../entities/user';
import { sendEmail } from '../utils/send-mail';
import { origin } from '../config';

export interface ReplyUser {
  id: string;
  displayName: string;
  email: string;
}

function transform(user: User): ReplyUser {
  return {
    id: user.id,
    displayName: user.data.displayName.iv,
    email: user.data.email.iv,
    firstName: user.data.firstName && user.data.firstName.iv,
    middleName: user.data.middleName && user.data.middleName.iv,
    lastName: user.data.lastName && user.data.lastName.iv,
    title: user.data.title && user.data.title.iv,
    orcid: user.data.orcid && user.data.orcid.iv,
    institution: user.data.institution && user.data.institution.iv,
  } as ReplyUser;
}

const debug = Debug('users.create');
export default class Users {
  cms: CMS;

  constructor() {
    this.cms = new CMS();
  }

  async create(user: CreateUser): Promise<ReplyUser> {
    let createdUser;
    try {
      createdUser = await this.cms.users.create(user);
    } catch (e) {
      throw Boom.conflict('Duplicate');
    }

    const [{ code }] = createdUser.data.connections.iv;
    const link = new url.URL(path.join(`/welcome/${code}`), origin);

    const [err] = await Intercept(
      sendEmail({
        to: [user.email],
        template: 'Welcome',
        values: {
          firstName: user.displayName,
          link: link.toString(),
        },
      }),
    );

    // istanbul ignore if
    if (err) {
      debug(err);
    }

    return transform(createdUser);
  }

  async fetch(): Promise<ReplyUser[]> {
    const users = await this.cms.users.fetch();
    return users.length ? users.map(transform) : [];
  }

  async fetchById(id: string): Promise<ReplyUser> {
    let user;
    try {
      user = await this.cms.users.fetchById(id);
    } catch (err) {
      throw Boom.notFound();
    }
    return transform(user);
  }

  async fetchByCode(code: string): Promise<ReplyUser> {
    const user = await this.cms.users.fetchByCode(code);
    if (!user) {
      throw Boom.forbidden();
    }
    return transform(user);
  }

  async connectByCode(
    code: string,
    profile: auth0.UserInfo,
  ): Promise<ReplyUser> {
    const user = await this.cms.users.fetchByCode(code);
    if (!user) {
      throw Boom.forbidden();
    }
    return transform(
      await this.cms.users.connectByCode(user, {
        id: profile.sub,
        source: 'auth0',
        raw: profile,
      }),
    );
  }
}
