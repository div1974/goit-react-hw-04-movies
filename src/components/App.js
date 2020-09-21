import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Spinner from "../components/Loader";
import routes from "../routes";

const Home = lazy(() => import("../views/Home" /* webpackChunkName: 'Home' */));
const MoviesPage = lazy(() =>
  import("../views/MoviesPage" /* webpackChunkName: 'MoviesPage' */)
);
const MovieDetailsPage = lazy(() =>
  import("../views/MovieDetailsPage" /* webpackChunkName: 'MovieDetailsPage' */)
);
const NotFound = lazy(() =>
  import("../views/NotFound" /* webpackChunkName: 'NotFoundPage' */)
);

const App = () => (
  <Layout>
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path={routes.home} exact component={Home} />
        <Route path={routes.movies} exact component={MoviesPage} />
        <Route path={routes.movieDetails} component={MovieDetailsPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  </Layout>
);

export default App;
