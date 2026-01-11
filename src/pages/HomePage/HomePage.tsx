import {Heading} from "../../shared/ui/Heading";
import styles from './HomePage.module.scss'
import {MilkAndCookiesIcon} from "../../components/icons";
import coverImage from '../../assets/images/IMG_0773.webp'
import {ItemList} from "../../shared/ui/ItemList";
import { mockAlbums } from '../../shared/mocks/albums';
import {Link} from "react-router-dom";

export default function HomePage() {
    const IconComponent = MilkAndCookiesIcon;
    const featuredAlbums = mockAlbums.filter(album => album.isOnIndex === true);

    return (
        <div>
            <Heading
                icon={<IconComponent />}
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
                <ItemList
                    items={featuredAlbums}
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
                            <h2 className={styles.albums__item__title}>
                                {album.title}
                            </h2>
                            {album.caption && (
                                <p className={styles.albums__item__caption}>{album.caption}</p>
                            )}
                            {album.description && (
                                <p className={styles.albums__item__description}>{album.description}</p>
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
