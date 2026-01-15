import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Navigation.module.scss';

interface NavItem {
    path: string;
    translationKey: string;
    exact?: boolean;
}

const navItems: NavItem[] = [
    { path: '/', translationKey: 'menu.mainPage', exact: true },
    { path: '/albums', translationKey: 'menu.albums' },
    { path: '/about', translationKey: 'menu.about' },
    { path: '/test-page', translationKey: 'menu.test-page' },
];

export const Navigation: FC = () => {
    const { t } = useTranslation();

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
                            {t(item.translationKey)}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
