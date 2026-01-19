import { useState, useMemo } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Heading } from "../../shared/ui/Heading";
import { AlbumsTabs } from "../../widgets/AlbumsTabs/AlbumsTabs";
import { ItemList } from '../../shared/ui/ItemList';
import { mockAlbums } from '../../shared/mocks/albums';
import { Link } from 'react-router-dom';
import styles from './AlbumsPage.module.scss';
import buttonStyles from "../../shared/ui/Button/Button.module.scss";

export default function AlbumsPage() {
    const { t } = useTranslation();
    const [activeAlbumKey, setActiveAlbumKey] = useState<string>("all");

    const albumKeys = useMemo(() => {
        const keys = new Set<string>();
        mockAlbums.forEach(album => {
            if (album.albumKey) {
                keys.add(album.albumKey);
            }
        });
        return Array.from(keys);
    }, []);

    const filteredAlbums = useMemo(() => {
        if (activeAlbumKey === "all") {
            return mockAlbums;
        }
        return mockAlbums.filter(album => album.albumKey === activeAlbumKey);
    }, [activeAlbumKey]);

    const handleAlbumKeyChange = (albumKey: string) => {
        setActiveAlbumKey(albumKey);
    };

    return (
        <>
            <Heading
                heading={<Trans i18nKey="albums.allAlbumsPageTitle" components={{ b: <b /> }}>
                    <b>Albums,</b> bitte
                </Trans>}
            />
            <div className={styles.content}>
                <AlbumsTabs
                    albumKeys={albumKeys}
                    activeAlbumKey={activeAlbumKey}
                    onAlbumKeyChange={handleAlbumKeyChange}
                />
                <div className={styles.albums__main}>
                    <div className={styles.albums__mainBg} />

                    <ItemList
                        items={filteredAlbums}
                        renderItem={(album) => {
                            const albumKey = `album${album.pageCode?.charAt(0).toUpperCase()}${album.pageCode?.slice(1).toLowerCase()}`;

                            return (
                                <div className={styles.albums__item}>
                                    <div className={styles.albums__item__cover}>
                                        <img
                                            src={album.imageMain}
                                            alt={album.title}
                                            draggable="false"
                                            className={styles.albums__item__image}
                                        />
                                    </div>
                                    <h2 className={styles.albums__item__title}>
                                        {t(`${albumKey}.title`)}
                                    </h2>
                                    {album.caption && (
                                        <p className={styles.albums__item__caption}>
                                            {t(`${albumKey}.caption`)}
                                        </p>
                                    )}

                                    {album.description && (
                                        <p className={styles.albums__item__description}
                                           dangerouslySetInnerHTML={{ __html: t(`${albumKey}.description`) }}
                                        />
                                    )}
                                    {album.button && (
                                        <Link
                                            to={`/albums/${album.albumCode}/${album.pageCode}`}
                                            className={`${styles.albums__item__btn} ${buttonStyles.btn} ${buttonStyles.btnPrimary} ${buttonStyles.btnOutline}`}
                                        >
                                            {t(`${albumKey}.buttonText`, album.buttonText || "перейти")}
                                        </Link>
                                    )}
                                </div>
                            )
                        }}
                        gridVariant="grid-3"
                        emptyMessage={
                            activeAlbumKey === "all"
                                ? "Альбомы не найдены"
                                : `В категории "${activeAlbumKey}" нет альбомов`
                        }
                    />
                </div>
            </div>
        </>
    );
}
