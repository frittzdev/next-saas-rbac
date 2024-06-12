import { compare } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with e-mail & password',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const userfromEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!userfromEmail) {
        throw new BadRequestError('Invalid credentails.')
      }

      if (userfromEmail.passwordHash === null) {
        throw new BadRequestError(
          'User does not have a password, use social login.',
        )
      }

      const ispassowordValid = await compare(
        password,
        userfromEmail.passwordHash,
      )

      if (!ispassowordValid) {
        throw new BadRequestError('Invalid credentails.')
      }

      const token = await reply.jwtSign(
        {
          sub: userfromEmail.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return reply.status(201).send({ token })
    },
  )
}
