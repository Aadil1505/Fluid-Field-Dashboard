import DashboardPage from '@/components/global/dashboard'
import { requireAuth } from '@/lib/require-auth'

export default async function page() {
  await requireAuth()

  return (
    <DashboardPage/>
  )
}