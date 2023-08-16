import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>NextAuth</h1>
      <div>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <div>
        <Link href="/login/request">Login</Link>
      </div>
    </main>
  )
}
