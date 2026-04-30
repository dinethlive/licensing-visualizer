import { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Home from './components/Home'
import ChangelogPage from './components/ChangelogPage'
import SourcesPage from './components/SourcesPage'
import ComparisonPage from './components/ComparisonPage'

import Chapter1 from './components/chapters/01-Prologue'
import Chapter2 from './components/chapters/02-Regulators'
import Chapter3 from './components/chapters/03-Infrastructure'
import Chapter4 from './components/chapters/04-Fairness'
import Chapter5 from './components/chapters/05-Protection'
import Chapter6 from './components/chapters/06-Cybersecurity'
import Chapter7 from './components/chapters/07-AmlKyc'
import Chapter8 from './components/chapters/08-Economics'
import Chapter9 from './components/chapters/09-Convergence'

const ROUTES: Record<string, () => JSX.Element> = {
  prologue:       Chapter1,
  regulators:     Chapter2,
  infrastructure: Chapter3,
  fairness:       Chapter4,
  protection:     Chapter5,
  cybersecurity:  Chapter6,
  'aml-kyc':      Chapter7,
  economics:      Chapter8,
  convergence:    Chapter9,
  changelog:      ChangelogPage,
  sources:        SourcesPage,
  comparison:     ComparisonPage,
}

const defaultRoute = 'home'

export default function App() {
  const [active, setActive] = useState<string>(() => {
    if (typeof window === 'undefined') return defaultRoute
    const hash = window.location.hash.replace(/^#\/?/, '')
    return hash || defaultRoute
  })

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '')
      setActive(hash || defaultRoute)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = (slug: string) => {
    window.location.hash = '/' + slug
    setActive(slug)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const Page = ROUTES[active]

  return (
    <Layout active={active} onSelect={navigate}>
      {active === 'home' || !Page ? <Home onSelect={navigate} /> : <Page />}
    </Layout>
  )
}
