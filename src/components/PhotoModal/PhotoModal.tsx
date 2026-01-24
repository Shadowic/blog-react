import { FC } from "react";
import { Modal } from "../../shared/ui/Modal";
import styles from "./PhotoModal.module.scss";

interface PhotoModalProps {
    isOpen: boolean;
    onClose: () => void;
    photos: string[];
    currentIndex: number;
    albumTitle: string;
    onPrev: () => void;
    onNext: () => void;
    onSelectPhoto: (index: number) => void;
}

export const PhotoModal: FC<PhotoModalProps> = ({
        isOpen,
        onClose,
        photos,
        currentIndex,
        albumTitle,
        onPrev,
        onNext,
        onSelectPhoto
    }) => {
    if (photos.length === 0) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.photoModal}>
                <div className={styles.photoContainer}>
                    <button
                        className={`${styles.navButton} ${styles.navButton__left}`}
                        onClick={onPrev}
                        aria-label="Предыдущее фото"
                    >
                        ←
                    </button>

                    <img
                        src={photos[currentIndex]}
                        alt={`Фото ${currentIndex + 1}`}
                        className={styles.modalPhoto}
                        draggable="false"
                    />

                    <button
                        className={`${styles.navButton} ${styles.navButton__right}`}
                        onClick={onNext}
                        aria-label="Следующее фото"
                    >
                        →
                    </button>
                </div>

                <div className={styles.thumbnails}>
                    {photos.map((photo, index) => (
                        <button
                            key={index}
                            onClick={() => onSelectPhoto(index)}
                            className={`${styles.thumbnail} ${currentIndex === index ? styles.active : ''}`}
                        >
                            <img
                                src={photo}
                                alt={`Превью ${index + 1}`}
                                className={styles.thumbnailImage}
                                draggable="false"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </Modal>
    );
};
