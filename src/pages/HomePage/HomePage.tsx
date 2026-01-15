import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import {Heading} from "../../shared/ui/Heading";
import styles from './HomePage.module.scss'
import coverImage from '../../assets/images/IMG_0773.webp'
import {ItemList} from "../../shared/ui/ItemList";
import { mockAlbums } from '../../shared/mocks/albums';
import {Link} from "react-router-dom";
import {Button} from "../../shared/ui/Button";

const getRandomItems = <T,>(array: T[], count: number): T[] => {
    if (!array || array.length === 0) return [];

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
};

export default function HomePage() {
    const { t } = useTranslation();
    const [randomAlbums, setRandomAlbums] = useState<typeof mockAlbums>([]);

    useEffect(() => {
        const featuredAlbums = mockAlbums.filter(album => album.isOnIndex === true);

        const albumsWithRandomPhotos = featuredAlbums.map(album => ({
            ...album,
            randomGallery: getRandomItems(album.imagesGallery || [], 6)
        }));

        setRandomAlbums(albumsWithRandomPhotos);
    }, []);

    return (
        <div>
            <Heading
                heading={<Trans i18nKey="index.title" components={{ b: <b /> }}>
                    <b>Fallback</b> текст
                </Trans>}
                caption={t("index.subtitle")}
            />
            <div className={styles.content}>
                <p
                    className={styles.intro}
                    dangerouslySetInnerHTML={{ __html: t("index.description") }}
                />
                <div className={styles.cover}>
                    <div className={styles.cover__wrap}>
                        <img src={coverImage} className={styles.cover__image} width={1280} height={853} alt="cover photo"/>
                    </div>
                </div>
            </div>

            <div className={styles.albums}>
                <div className={styles.albums__mainBg}></div>
                <ItemList
                    items={randomAlbums}
                    renderItem={(album) => {
                        const albumKey = `album${album.pageCode?.charAt(0).toUpperCase()}${album.pageCode?.slice(1).toLowerCase()}`;

                        return (
                            <Link
                                to={`/albums/${album.albumCode}/${album.pageCode}`}
                                className={styles.albums__item}
                            >
                                <div className={styles.albums__item__cover}>
                                    <img
                                        src={album.imageMain}
                                        alt={album.title}
                                        draggable="false"
                                        className={styles.albums__item__image}
                                    />
                                </div>
                                <div className={styles.albums__item__previews}>
                                    {album.randomGallery?.map((image, index) => (
                                        <div key={index} className={styles.albums__item__preview}>
                                            <img
                                                src={image}
                                                alt={`${album.title} - фото ${index + 1}`}
                                                draggable="false"
                                                className={styles}
                                            />
                                        </div>
                                    ))}
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
                                    <Button className={styles.albums__item__btn}>
                                        {t(`${albumKey}.buttonText`, album.buttonText || "перейти")}
                                    </Button>
                                )}
                            </Link>
                        )
                    }}
                    gridVariant="grid-4"
                    emptyMessage="Избранные альбомы скоро появятся"
                />
            </div>
        </div>
    );
}
