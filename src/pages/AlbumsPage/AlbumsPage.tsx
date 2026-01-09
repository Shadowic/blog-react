import { Heading } from "../../shared/ui/Heading";
import { AlbumsTabs } from "../../widgets/AlbumsTabs/AlbumsTabs";
import { ItemList } from '../../shared/ui/ItemList';
import { mockAlbums } from '../../shared/mocks/albums';
import { Link } from 'react-router-dom';
import styles from './AlbumsPage.module.scss';

export default function AlbumsPage() {
    return (
        <>
            <Heading
                heading={<>Типа <b>страница</b> с альбомами</>}
            />
            <div className={styles.content}>
                <AlbumsTabs />
                <div className={styles.albums__main}>
                    <div className={styles.albums__mainBg} />

                    <ItemList
                        items={mockAlbums}
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
                        gridVariant="grid-3"
                        // emptyMessage="Альбомы не найдены"
                        // className={styles.albumsList}
                        // listClassName={styles.albumsGrid}
                        // itemClassName={styles.albumItem}
                    />

                </div>
            </div>
        </>
    );
}
