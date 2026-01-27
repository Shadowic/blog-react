import { useState } from "react";
import { Heading } from "../../shared/ui/Heading";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { mockAlbums } from '../../shared/mocks/albums';
import { ItemList } from "../../shared/ui/ItemList";
import { PhotoModal } from "../../components/PhotoModal/PhotoModal";
import { usePhotoModal } from "../../components/PhotoModal/usePhotoModal";
import styles from './AlbumPage.module.scss';

export default function AlbumPage() {
    const { t } = useTranslation();
    const {
        isOpen,
        currentIndex,
        photos,
        openModal,
        closeModal,
        goToPrev,
        goToNext,
        selectPhoto
    } = usePhotoModal();

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

    const handlePhotoClick = (index: number) => {
        openModal(album.imagesGallery || [], index);
    };

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
                    <span dangerouslySetInnerHTML={{
                        __html: t(`${albumKey}.description`, album.description)
                    }} />
                }
            />

            {album.imagesGallery && album.imagesGallery.length > 0 && (
                <>
                    <div className={styles.album}>
                        <div className={styles.album__mainBg}></div>
                        <ItemList
                            items={album.imagesGallery}
                            renderItem={(imageUrl, index) => (
                                <button
                                    className={styles.album__item}
                                    onClick={() => handlePhotoClick(index)}
                                    aria-label={`Открыть фото ${index + 1}`}
                                >
                                    <img
                                        src={imageUrl}
                                        alt={`${album.title} - фото ${index + 1}`}
                                        loading="lazy"
                                        draggable="false"
                                    />
                                </button>
                            )}
                            gridVariant="grid-3"
                            emptyMessage="В этом альбоме пока нет фотографий"
                        />
                    </div>

                    <PhotoModal
                        isOpen={isOpen}
                        onClose={closeModal}
                        photos={photos}
                        currentIndex={currentIndex}
                        onPrev={goToPrev}
                        onNext={goToNext}
                        onSelectPhoto={selectPhoto}
                    />
                </>
            )}
        </div>
    );
}
