'use client'

import { useSession } from 'next-auth/react'

const DashboardPage = () => {

  const { data: session, status } = useSession();
  console.log('session', session);

  return (
    <>
      <div>DashboardPage</div>
      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>
    </>
  )
}

export default DashboardPage