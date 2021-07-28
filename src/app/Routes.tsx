/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { useTranslation } from 'react-i18next';
import { BattleshipPage } from './pages/Battleship';
import { GameOverPage } from './pages/GameOver';
import { ScoreboardPage } from './pages/Scoreboard';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Battleship"
        defaultTitle="Battleship"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A Battleship game web app" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/battleship" component={BattleshipPage} />
        <Route path="/game-over" component={GameOverPage} />
        <Route path="/scoreboard" component={ScoreboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
