import { auth, signOut } from '@/auth'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'

export default async function Page() {
  const session = await auth()

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server'

          await signOut()
        }}
      >
        <Button type="submit">Sign Out</Button>
        <ModeToggle />
      </form>
    </div>
  )
}
