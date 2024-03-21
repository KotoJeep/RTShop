import { ReactNode } from 'react'
import Header from '@/components/modules/Header/Header'

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    {children}
    <div className='' />
  </>
)

export default Layout
