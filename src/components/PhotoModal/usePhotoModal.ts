import { useState, useCallback } from 'react';

export const usePhotoModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [photos, setPhotos] = useState<string[]>([]);
    const [albumTitle, setAlbumTitle] = useState('');

    const openModal = useCallback((photoList: string[], index: number = 0, title: string = '') => {
        setPhotos(photoList);
        setCurrentIndex(index);
        setAlbumTitle(title);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const goToPrev = useCallback(() => {
        setCurrentIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1));
    }, [photos.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1));
    }, [photos.length]);

    const selectPhoto = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    return {
        isOpen,
        currentIndex,
        photos,
        albumTitle,
        openModal,
        closeModal,
        goToPrev,
        goToNext,
        selectPhoto
    };
};
