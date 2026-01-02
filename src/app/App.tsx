import type { FC } from "react";
import {ModalProvider} from "../shared/lib/context/ModalContext";
import {AboutModal} from "./AboutModal";
import {ParticlesBackground} from '../shared/ui/ParticlesBackground/index';
import styles from './App.module.css'
import {MainLayout} from "../shared/layouts/MainLayout";
// import { StoreProvider } from "./providers/StoreProvider";
// import { RouterProvider } from "./providers/router/RouterProvider";
// import { LoadingProvider } from "@shared/lib/loading/LoadingProvider";

export const App: FC = () => {
  return (
    <>
      <ModalProvider>
        <ParticlesBackground />
        <MainLayout>
          <AboutModal />
            <div className={styles.textBlock}>
              <p className={styles.title}>React version is coming as soon as possible</p>
              <p className={styles.text}>React version is coming as soon as possible</p>
            </div>
        </MainLayout>
      </ModalProvider>
    </>
    // <StoreProvider>
    //   <LoadingProvider initialLoading={true}>
    //       <RouterProvider />
    //   </LoadingProvider>
    // </StoreProvider>
  );
};

export default App;
