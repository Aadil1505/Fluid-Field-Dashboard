import DashboardPage from '@/components/global/dashboard'
import { requireAuth } from '@/lib/require-auth'

export default async function page() {
  const session = await requireAuth()

  return (
    <DashboardPage
      user={{
        name: session.user.name,
        email: session.user.email,
      }}
    />
  )
}
