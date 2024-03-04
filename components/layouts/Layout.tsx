import { ReactNode } from 'react'
import Header from '@/components/modules/header/Header'

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    {children}
    <div className='' />
  </>
)

export default Layout
