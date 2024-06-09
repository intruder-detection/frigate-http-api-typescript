import { z } from 'zod';

const FIVE_SECONDS_TO_MS: number = 5000;

const EnvSchema = z.object({
  DEFAULT_TIMEOUT: z.coerce
    .number()
    .positive()
    .min(0, `DEFAULT_TIMEOUT should be > 0`)
    .default(FIVE_SECONDS_TO_MS),
  FRIGATE_HTTP_URL: z.string().url('The frigate URL with respective port. e.g. http://localhost:5000/ or http://192.168.1.245:5000'),
  FRIGATE_API_PREFIX: z.string( { message: ' the' }).default('api')
});

export const environment = EnvSchema.parse(process.env);
