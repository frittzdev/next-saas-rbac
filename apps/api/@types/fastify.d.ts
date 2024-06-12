import 'fastify'

import { Member, Organization } from '@prisma/client'

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
    getUserMembership(
      slug: string,
    ): promise<{ organization: Organization; membership: Member }>
  }
}
