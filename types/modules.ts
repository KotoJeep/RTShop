import { JSX, ReactNode } from 'react'

export interface IAccordionProps {
  children: ReactNode
  title: string | JSX.Element
  titleClass: string
  rotateIconClass?: string
}

export interface IMenuLinkItemProps {
  item: {
    id: number
    text: string
    href: string
  }
  handleRedirectToCatalog: (arg: string) => void
}
