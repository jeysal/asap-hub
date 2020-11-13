import { RestUser } from '@asap-hub/squidex';
import { TeamRole } from '@asap-hub/model';

type Role = RestUser['data']['role']['iv'];
type Degree = NonNullable<RestUser['data']['degree']>['iv'] | undefined;

export interface Data {
  email: string;
  application: string;
  role: TeamRole;
  projectTitle: string;
  firstName: string;
  lastName: string;
  institution: string;
  degree: Degree;
  location: string;
  jobTitle: string;
  orcid: string;
  questions: string[];
  biography: string;
  researchInterest: string;
  responsibilities: string;
  skills: string[];
  skillsDescription: string;
  asapRole: Role;
}

export default (data: string[]): Data => {
  const [
    email,
    application,
    role,
    projectTitle,
    firstName,
    lastName,
    institution,
    degree,
    jobTitle,
    norcid,
    question1,
    question2,
    question3,
    question4,
    skillsDescription,
    biography,
    researchInterest,
    responsibilities,
    skills,
    asapRole,
    location,
  ] = data.map((s) => s.trim());

  const orcid = norcid.match(/((\d|X){4}-(\d|X){4}-(\d|X){4}-(\d|X){4})/i);
  return {
    application,
    biography,
    degree: ['BA', 'BSc', 'MSc', 'PhD', 'MD', 'PhD, MD'].includes(degree)
      ? (degree as Degree)
      : undefined,
    email,
    firstName,
    institution,
    jobTitle,
    lastName,
    orcid: orcid ? orcid[0] : '',
    projectTitle,
    questions: [question1, question2, question3, question4].filter(Boolean),
    researchInterest,
    responsibilities,
    location,
    role: role as TeamRole,
    skills: skills
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean),
    skillsDescription,
    asapRole: ['Staff', 'Grantee', 'Guest'].includes(asapRole)
      ? (asapRole as Role)
      : 'Guest',
  };
};