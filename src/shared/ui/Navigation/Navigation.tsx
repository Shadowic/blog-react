import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';

interface NavItem {
    path: string;
    label: string;
}

const navItems: NavItem[] = [
    { path: '/', label: 'Главная' },
    { path: '/albums', label: 'Альбомы' },
    { path: '/about', label: 'О проекте' },
    { path: '/test-page', label: 'Тестовая' },
];

export const Navigation: FC = () => {
    const location = useLocation();

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbar__content}>
                {navItems.map((item) => (
                    <li key={item.path} className={styles.navbar__content__item}>
                        <Link
                            to={item.path}
                            className={`${styles.navLink} ${
                                location.pathname === item.path ? styles.active : ''
                            }`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
