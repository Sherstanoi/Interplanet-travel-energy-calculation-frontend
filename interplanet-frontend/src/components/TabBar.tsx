import type { FC } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../Routes'
import './TabBar.css'

interface Tab {
  path: string
  icon: string
  label: string
  enabled: boolean
}

const TABS: Tab[] = [
  { path: ROUTES.FEED, icon: '/img/Icon-home.png', label: 'Лента', enabled: true },
  { path: ROUTES.CREATE, icon: '/img/Icon-plus.png', label: 'Добавление', enabled: false },
  { path: ROUTES.TILES, icon: '/img/Icon-plates.png', label: 'Плитка', enabled: true },
  { path: ROUTES.LOGIN, icon: '/img/Icon-login.png', label: 'Вход', enabled: false },
]

export const TabBar: FC = () => {
  const { pathname } = useLocation()

  return (
    <Navbar as="nav" className="tabBar" aria-label="Основная навигация">
      <Nav>
        {TABS.map((tab) => {
          const icon = <img src={tab.icon} alt={tab.label} title={tab.label} />

          return tab.enabled ? (
            <Nav.Link key={tab.path} as={Link} to={tab.path} active={pathname.startsWith(tab.path)}>
              {icon}
            </Nav.Link>
          ) : (
            <Nav.Link key={tab.path} disabled>
              {icon}
            </Nav.Link>
          )
        })}
      </Nav>
    </Navbar>
  )
}
