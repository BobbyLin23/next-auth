'use server'

import { z } from 'zod'

import { getUserByEmail } from '@/data/user'
import { ResetSchema } from '@/schemas'
import { generatePasswordResetToken } from '@/lib/token'
import { sendPasswordResetEmail } from '@/lib/mail'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedField = ResetSchema.safeParse(values)

  if (!validatedField.success) {
    return {
      error: 'Invalid fields',
    }
  }

  const { email } = validatedField.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return {
      error: 'Email does not exist!',
    }
  }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )

  return { success: 'Reset email sent!' }
}
