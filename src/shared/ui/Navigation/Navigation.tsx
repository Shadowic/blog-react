import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

interface NavItem {
    path: string;
    label: string;
    exact?: boolean;
}

const navItems: NavItem[] = [
    { path: '/', label: 'Главная', exact: true },
    { path: '/albums', label: 'Альбомы' },
    { path: '/about', label: 'О проекте' },
    { path: '/test-page', label: 'Тестовая' },
];

export const Navigation: FC = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbar__content}>
                {navItems.map((item) => (
                    <li key={item.path} className={styles.navbar__content__item}>
                        <NavLink
                            to={item.path}
                            end={item.exact}
                            className={({ isActive }) =>
                                `${styles.navLink} ${isActive ? styles.active : ''}`
                            }
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
