import type { FC } from "react";
import {ModalProvider} from "../shared/lib/context/ModalContext";
import {AboutModal} from "./AboutModal";
import {ParticlesBackground} from '../shared/ui/ParticlesBackground/index';
import {MainLayout} from "../shared/layouts/MainLayout";
import {Heading} from "../shared/ui/Heading";
import {MilkAndCookiesIcon} from "../components/icons";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import styles from './App.module.scss'
import {Container} from "../shared/ui/Container/Container";

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const AlbumsPage = lazy(() => import('../pages/AlbumsPage/AlbumsPage'));
const AlbumPage = lazy(() => import('../pages/AlbumPage/AlbumPage'));
const TestPage = lazy(() => import('../pages/TestPage/TestPage'));
const AboutPage = lazy(() => import('../pages/AboutPage/AboutPage'));

export const App: FC = () => {
  const IconComponent = MilkAndCookiesIcon;

  return (
    <BrowserRouter>
      <ModalProvider>
        <ParticlesBackground />
        <Container>
          <Suspense fallback={
            <div className={styles.loading}>
              <Heading
                  icon={<IconComponent />}
                  heading={<>Типа <b>Загрузка...</b></>}
                  caption="Загрузка is coming as soon as possible"
              />
            </div>
          }>
            <Routes>
              <Route element={
                <MainLayout>
                  {/* Содержимое для всех маршрутов */}
                  <AboutModal />
                  <Outlet /> {/* Здесь будут страницы */}
                </MainLayout>
              }>
                <Route path="/" element={<HomePage />} />
                <Route path="/albums" element={<AlbumsPage />} />
                <Route path="/albums/:albumCode" element={<AlbumsPage />} />
                <Route path="/:albumCode/:pageCode" element={<AlbumPage />} />
                <Route path="/test-page" element={<TestPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Route>
            </Routes>
          </Suspense>
        </Container>
      </ModalProvider>
    </BrowserRouter>
  );
};

export default App;
