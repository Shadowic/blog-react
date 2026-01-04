import type { FC } from "react";
import {ModalProvider} from "../shared/lib/context/ModalContext";
import {AboutModal} from "./AboutModal";
import {ParticlesBackground} from '../shared/ui/ParticlesBackground/index';
import styles from './App.module.css'
import {MainLayout} from "../shared/layouts/MainLayout";
import {Heading} from "../shared/ui/Heading";
import {MilkAndCookiesIcon} from "../components/icons";

// import { StoreProvider } from "./providers/StoreProvider";
// import { RouterProvider } from "./providers/router/RouterProvider";
// import { LoadingProvider } from "@shared/lib/loading/LoadingProvider";

export const App: FC = () => {
  const IconComponent = MilkAndCookiesIcon;

  return (
    <>
      <ModalProvider>
        <ParticlesBackground />
        <MainLayout>
          <AboutModal />
            <div className={styles.textBlock}>
              <Heading
                icon={<IconComponent />}
                heading={<>Типа <b>главная</b> страница</>}
                caption="React version is coming as soon as possible"
              />
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
