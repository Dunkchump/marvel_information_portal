import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense } from "react";
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';
import './App.scss'; // Создайте этот файл для стилей анимации

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const SingleCharPage = lazy(() => import("../pages/SingleCharPage"));

// Отдельный компонент для обработки маршрутов с анимацией
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        <Suspense fallback={<Spinner />}>
          <Routes location={location}>
            <Route path="/" element={<MainPage />} />
            <Route path="/:charId" element={<SingleCharPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/comics/:comicId" element={<SingleComicPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </CSSTransition>
    </SwitchTransition>
  );
};

function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;