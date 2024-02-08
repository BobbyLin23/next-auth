'use server'

import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verification-token'
import { db } from '@/lib/db'

export const newVerification = async (token: string) => {
  const exsitingToken = await getVerificationTokenByToken(token)

  if (!exsitingToken) {
    return { error: 'Token does not exist!' }
  }

  const hasExpired = exsitingToken.expires < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(exsitingToken.email)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: exsitingToken.email,
    },
  })

  await db.verificationToken.delete({
    where: {
      id: exsitingToken.id,
    },
  })

  return {
    success: 'Email verified!',
  }
}
