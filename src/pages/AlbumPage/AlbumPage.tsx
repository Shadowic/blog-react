import { Heading } from "../../shared/ui/Heading";
import { useTranslation, Trans } from "react-i18next";
import { useParams } from "react-router-dom";
import { mockAlbums } from '../../shared/mocks/albums';
import { ItemList } from "../../shared/ui/ItemList";
import styles from './AlbumPage.module.scss';

export default function AlbumPage() {
    const { t } = useTranslation();

    const { albumCode, pageCode } = useParams<{ albumCode: string; pageCode: string }>();
    const album = mockAlbums.find(
        a => a.albumCode === albumCode && a.pageCode === pageCode
    );

    if (!album) {
        return (
            <div className={styles.notFound}>
                <Heading
                    heading={t("albumPage.notFound.title", "404 - Альбом не найден")}
                    caption={t("albumPage.notFound.caption", "Попробуйте выбрать другой альбом")}
                />
            </div>
        );
    }

    const albumKey = `album${album.pageCode}`;

    return (
        <div>
            <Heading
                heading={
                    <>
                        <b>
                            {t(`${albumKey}.title`, album.title || `Альбом: ${album.pageCode}`)},
                        </b>
                        {` bitte`}
                    </>
                }
                caption={
                    <div dangerouslySetInnerHTML={{
                        __html: t(`${albumKey}.description`, album.description)
                    }} />
                }
            />

            {album.imagesGallery && album.imagesGallery.length > 0 && (
                <div className={styles.album}>
                    <div className={styles.album__mainBg}></div>
                    <ItemList
                        items={album.imagesGallery}
                        renderItem={(imageUrl, index) => (
                            <div className={styles.album__item}>
                                <img
                                    src={imageUrl}
                                    alt={`${album.title} - фото ${index + 1}`}
                                    loading="lazy"
                                    draggable="false"
                                />
                            </div>
                        )}
                        gridVariant="grid-3"
                        emptyMessage="В этом альбоме пока нет фотографий"
                    />
                </div>
            )}
        </div>
    );
}
