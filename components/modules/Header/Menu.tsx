import { useState } from 'react'
import useLang from '@/hooks/useLang'
import { useUnit } from 'effector-react/compat'
import { $menuIsOpen, closeMenu } from '@/context/modals'
import { removeOverflowHiddenFromBody } from '@/app/lib/utils/common'
import { setLang } from '@/context/lang'
import { AllowedLangs } from '@/constants/lang'
import Logo from '@/components/elements/Logo/Logo'
import { AnimatePresence, motion } from 'framer-motion'
import Accordion from '@/components/modules/Accordion/Accordion'
import { usePathname } from 'next/navigation'
import MenuLinkItem from '@/components/modules/Header/MenuLinkItem'
import Link from 'next/link'

const Menu = () => {
  const [showCatalogList, setShowCatalogList] = useState(false)
  const [showBuyersList, setShowBuyersList] = useState(false)
  const [showContactList, setShowContactList] = useState(false)
  const menuIsOpen = useUnit($menuIsOpen)
  const { lang, translations } = useLang()
  const pathName = usePathname()

  const handleSwitchLang = (lang: string) => {
    setLang(lang as AllowedLangs)
    localStorage.setItem('lang', JSON.stringify(lang))
  }
  const handleSwitchLangToRu = () => handleSwitchLang('ru')
  const handleSwitchLangToEn = () => handleSwitchLang('en')
  const handleCloseMenu = () => {
    removeOverflowHiddenFromBody()
    closeMenu()
  }

  const handleRedirectToCatalog = (path: string) => {
    if (pathName.includes('/catalog')) {
      window.history.pushState({ path }, '', path)
      window.location.reload()
    }
    handleCloseMenu()
  }
  const handleShowCatalogList = () => {
    setShowBuyersList(false)
    setShowContactList(false)
    setShowCatalogList(true)
  }
  const handleShowBuyersList = () => {
    setShowBuyersList(true)
    setShowContactList(false)
    setShowCatalogList(false)
  }
  const handleShowContactsList = () => {
    setShowBuyersList(false)
    setShowContactList(true)
    setShowCatalogList(false)
  }

  const clothLinks = [
    {
      id: 1,
      text: translations[lang].comparison['t-shirts'],
      href: '/catalog/cloth?offset=0&type=t-shirts',
    },
    {
      id: 2,
      text: translations[lang].comparison['long-sleeves'],
      href: '/catalog/cloth?offset=0&type=long-sleeves',
    },
    {
      id: 3,
      text: translations[lang].comparison.hoodie,
      href: '/catalog/cloth?offset=0&type=hoodie',
    },
    {
      id: 4,
      text: translations[lang].comparison.outerwear,
      href: '/catalog/cloth?offset=0&type=outerwear',
    },
  ]

  const accessoriesLinks = [
    {
      id: 1,
      text: translations[lang].comparison.bags,
      href: '/catalog/accessories?offset=0&type=bags',
    },
    {
      id: 2,
      text: translations[lang].comparison.headdress,
      href: '/catalog/accessories?offset=0&type=headdress',
    },
    {
      id: 3,
      text: translations[lang].comparison.umbrella,
      href: '/catalog/accessories?offset=0&type=umbrella',
    },
  ]

  const souvenirsLinks = [
    {
      id: 1,
      text: translations[lang].comparison['business-souvenirs'],
      href: '/catalog/souvenirs?offset=0&type=business-souvenirs',
    },
    {
      id: 2,
      text: translations[lang].comparison['promotional-souvenirs'],
      href: '/catalog/souvenirs?offset=0&type=promotional-souvenirs',
    },
  ]

  const officeLinks = [
    {
      id: 1,
      text: translations[lang].comparison.notebook,
      href: '/catalog/office?offset=0&type=notebook',
    },
    {
      id: 2,
      text: translations[lang].comparison.pen,
      href: '/catalog/office?offset=0&type=pen',
    },
  ]

  return (
    <nav className={`nav-menu ${menuIsOpen ? 'open' : 'close'}`}>
      <div className='container nav-menu__container'>
        <div className={`nav-menu__logo ${menuIsOpen ? 'open' : ''}`}>
          <Logo />
        </div>
        <img
          src='/img/menu-bg.png'
          alt='menu bacground'
          className={`nav-menu__bg ${menuIsOpen ? 'open' : ''}`}
        />
        <button
          className={`btn-reset nav-menu__close ${menuIsOpen ? 'open' : ''}`}
          onClick={handleCloseMenu}
        />
        <div className={`nav-menu__lang ${menuIsOpen ? 'open' : ''}`}>
          <button
            className={`btn-reset nav-menu__lang__btn ${lang === 'ru' ? 'lang-active' : ''}`}
            onClick={handleSwitchLangToRu}
          >
            RU
          </button>
          <button
            className={`btn-reset nav-menu__lang__btn ${lang === 'en' ? 'lang-active' : ''}`}
            onClick={handleSwitchLangToEn}
          >
            EN
          </button>
        </div>
        <ul className={`list-reset nav-menu__list ${menuIsOpen ? 'open' : ''}`}>
          <li className='nav-menu__list__item'>
            <button
              className='btn-reset nav-menu__list__item__btn'
              onMouseEnter={handleShowCatalogList}
            >
              {translations[lang].main_menu.catalog}
            </button>
            <AnimatePresence>
              {showCatalogList && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='list-reset nav-menu__accordion'
                >
                  <li className='nav-menu__accordion__item'>
                    <Accordion
                      title={translations[lang].main_menu.cloth}
                      titleClass='btn-reset nav-menu__accordion__item__title'
                    >
                      <ul className='list-reset nav-menu__accordion__item__list'>
                        {clothLinks.map((item) => (
                          <MenuLinkItem
                            item={item}
                            handleRedirectToCatalog={handleRedirectToCatalog}
                            key={item.id}
                          />
                        ))}
                      </ul>
                    </Accordion>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <Accordion
                      title={translations[lang].main_menu.accessories}
                      titleClass='btn-reset nav-menu__accordion__item__title'
                    >
                      <ul className='list-reset nav-menu__accordion__item__list'>
                        {accessoriesLinks.map((item) => (
                          <MenuLinkItem
                            item={item}
                            handleRedirectToCatalog={handleRedirectToCatalog}
                            key={item.id}
                          />
                        ))}
                      </ul>
                    </Accordion>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <Accordion
                      title={translations[lang].main_menu.souvenirs}
                      titleClass='btn-reset nav-menu__accordion__item__title'
                    >
                      <ul className='list-reset nav-menu__accordion__item__list'>
                        {souvenirsLinks.map((item) => (
                          <MenuLinkItem
                            item={item}
                            handleRedirectToCatalog={handleRedirectToCatalog}
                            key={item.id}
                          />
                        ))}
                      </ul>
                    </Accordion>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <Accordion
                      title={translations[lang].main_menu.office}
                      titleClass='btn-reset nav-menu__accordion__item__title'
                    >
                      <ul className='list-reset nav-menu__accordion__item__list'>
                        {officeLinks.map((item) => (
                          <MenuLinkItem
                            item={item}
                            handleRedirectToCatalog={handleRedirectToCatalog}
                            key={item.id}
                          />
                        ))}
                      </ul>
                    </Accordion>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          <li className='nav-menu__list__item'>
            <button
              className='btn-reset nav-menu__list__item__btn'
              onMouseEnter={handleShowBuyersList}
            >
              {translations[lang].main_menu.buyers}
            </button>
            <AnimatePresence>
              {showBuyersList && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='list-reset nav-menu__accordion'
                >
                  <li className='nav-menu__accordion__item '>
                    <Link
                      href='/about'
                      className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
                    >
                      {translations[lang].main_menu.about}
                    </Link>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <Link
                      href='/blog'
                      className='nav-menu__accordion__item__link'
                    >
                      {translations[lang].main_menu.blog}
                    </Link>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <Link
                      href='/shipping-and-payment'
                      className='nav-menu__accordion__item__link'
                    >
                      {translations[lang].main_menu.shipping}
                    </Link>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <Link
                      href='/purchase-returns'
                      className='nav-menu__accordion__item__link'
                    >
                      {translations[lang].main_menu.returns}
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          <li className='nav-menu__list__item'>
            <button
              className='btn-reset nav-menu__list__item__btn'
              onMouseEnter={handleShowContactsList}
            >
              {translations[lang].main_menu.contacts}
            </button>
            <AnimatePresence>
              {showContactList && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='list-reset nav-menu__accordion'
                >
                  <li className='nav-menu__accordion__item '>
                    <a
                      href='tel:+79995558293'
                      className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
                    >
                      +7 (999) 555 82 93
                    </a>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <a
                      href='mailto:test@gmail.com'
                      className='nav-menu__accordion__item__link'
                    >
                      Email
                    </a>
                  </li>

                  <li className='nav-menu__accordion__item'>
                    <a
                      href='https://t.me/illiiilllliiiii'
                      className='nav-menu__accordion__item__link'
                    >
                      {translations[lang].main_menu.tg}
                    </a>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <a
                      href='https://vk.com/illiill'
                      className='nav-menu__accordion__item__link'
                    >
                      {translations[lang].main_menu.vk}
                    </a>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Menu
// ${menuIsOpen ? "open" : ""}
