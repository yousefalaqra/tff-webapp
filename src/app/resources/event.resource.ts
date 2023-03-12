import { EntryResource } from './entry.resource';

export interface EventResource {
  _id: number;

  title: string;

  description: string;

  isMain: boolean; // onlu one event per time can be true among all events in the system for a user.

  isPublished: boolean;

  startTime: number;

  endTime: number;

  src: string;

  img: string;

  livePageUrl: string;

  entries: Array<EntryResource>;
}
