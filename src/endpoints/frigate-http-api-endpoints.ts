import { ManagementAndInformation } from './app.enum';
import { Events } from './events.enum';
import { Media } from './media';
import { Preview } from './preview.enum';
import { Recordings } from './recordings.enum';
import { Timeline } from './timeline.enum';
import { Reviews } from './reviews.enum';

export type FrigateHttpApiEndpoints = ManagementAndInformation | Events | Media | Preview | Recordings | Reviews | Timeline;
export const FrigateHttpApiEndpoints = { ...ManagementAndInformation, ...Events, ...Media, ...Preview, ...Recordings, ...Reviews, ...Timeline } as const;
