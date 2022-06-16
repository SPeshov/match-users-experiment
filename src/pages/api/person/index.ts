import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  usersToFollow?: [string, number][];
};

const DATA = [
  {
    name: `John Doe`,
    pos: [43.036871, -89.324967],
    tags: [`general`, `basic`],
    level: 3,
    availability: 1,
  },
  {
    name: `Amy Schmidt`,
    pos: [39.48586, -121.387316],
    tags: [`honest`, `uneven`],
    level: 4,
    availability: 2,
  },
  {
    name: `Robert Summers`,
    pos: [33.657366, -86.643871],
    tags: [`efficient`, `psychotic`],
    level: 1,
    availability: 2,
  },
  {
    name: `Steven Walls`,
    pos: [43.484856, -83.849829],
    tags: [`huge`, `grumpy`],
    level: 2,
    availability: 2,
  },
  {
    name: `Elizabeth Bateman`,
    pos: [38.886231, -99.306865],
    tags: [`heavy`, `goofy`],
    level: 5,
    availability: 3,
  },
  {
    name: `Robert Galusha`,
    pos: [29.713645, -95.534338],
    tags: [`vast`, `depressed`],
    level: 2,
    availability: 1,
  },
];

// Input:
// We ask them about their interests, availability, English confidence level, etc.

// Matching on:
// matching  similar interests, availability, etc.
// We also record data about what was the topic of the events that they took part in, who else was in those events, etc.

const EnglishLevelScore: { [key: string]: number } = {
  B1: 1,
  B2: 2,
  C1: 3,
  C2: 4,
  Fluent: 5,
};

const Availability: { [key: string]: number } = {
  Low: 1,
  Medium: 2,
  High: 3,
};

export type Person = {
  name: string;
  pos: number[];
  tags: string[];
  level: number;
  availability: number;
};

const findMatches = ({ person, data }: { person: Person; data: Person[] }) => {
  const scores: { [key: string]: number } = {};
  const distances: { [key: string]: number } = {};
  const lat = person.pos[0];
  const lng = person.pos[1];
  const tags = person.tags;
  const level = person.level;

  data
    .filter((user) => user.name !== person.name)
    .forEach((user) => {
      // if user level is lower then onboarding person then skip the user
      if (user.level < level) {
        return;
      }

      // initial score will be user level + availability
      scores[user.name] = user.level + user.availability;

      //Interests matches
      const tagsMatchesCount = user.tags.filter(
        (tag) => tags.indexOf(tag) > -1,
      ).length;

      scores[user.name] = scores[user.name] + tagsMatchesCount;

      //User location matches
      const dlat = Math.abs(lat - user.pos[0]);
      const dlng = Math.abs(lng - user.pos[1]);
      const distance = Math.sqrt(Math.pow(dlat, 2) + Math.pow(dlng, 2));

      distances[user.name] = distance;
    });

  // Needed to normalize the distances
  const maxDistance =
    Object.values(distances)
      .sort((a, b) => b - a)
      .shift() || 1;

  // Substract the normalized distance from 1, so the shorter distance = more points
  for (const name in distances) {
    const points = 1 - distances[name] / maxDistance;
    scores[name] = points + scores[name];
  }

  // Sort by score; the best match is the first element
  return Object.entries(scores).sort((a, b) => b[1] - a[1]);
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { method } = req;

  if (method === `GET`) {
    return res.status(200).json({ message: `Error` });
  }

  const { body } = req;

  //** Here we can do a initial database serch for tags only,
  // and only compare users that have similar interests, instead of fetching all users and running the algorithm to all od them */

  const usersToFollow = findMatches({ person: body.person, data: DATA });

  //todo: try catch errors

  return res.status(200).json({ message: `Success`, usersToFollow });
}
