import { useState, useEffect } from "react";
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
                heading={<>Типа <b>главная</b> страница</>}
                caption="Давайте посидим, посмотрим картиночки"
            />
            <div className={styles.content}>
                <p className={styles.intro}>
                    Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности требуют от нас анализа соответствующий условий активизации. Задача организации, в особенности же рамки и место обучения кадров требуют от нас анализа новых предложений. Повседневная практика показывает, что начало повседневной работы по формированию позиции играет важную роль в формировании позиций, занимаемых участниками в отношении поставленных задач.
                </p>
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
                    renderItem={(album) => (
                        <Link
                            to={`/${album.albumCode}/${album.pageCode}`}
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
                                {album.title}
                            </h2>
                            {album.caption && (
                                <p className={styles.albums__item__caption}>{album.caption}</p>
                            )}
                            {album.description && (
                                <p className={styles.albums__item__description}>{album.description}</p>
                            )}
                            {album.button && (
                                <Button>{album.buttonText}</Button>
                            )}
                        </Link>
                    )}
                    gridVariant="grid-4"
                    emptyMessage="Избранные альбомы скоро появятся"
                />
            </div>
        </div>
    );
}
