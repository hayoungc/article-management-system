import React from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import { history } from './services';
import { Alert, PrivateRoute } from './components';
import { UserLayout } from './pages/user';
import { ArticleLayout, List } from './pages/article';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body, html, #root {
    height: 100%;
    font-family: -apple-system, Ubuntu , BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;;
  }

  body {
    font-family: var(--bs-body-font-family);
    font-size: var(--bs-body-font-size);
    font-weight: var(--bs-body-font-weight);
    line-height: var(--bs-body-line-height);
    color: var(--bs-body-color);
    text-align: var(--bs-body-text-align);
    background-color: var(--bs-body-bg);
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    --bs-body-line-height: 1.5;
  }
  
  .react-confirm-alert-button-group > button {
    font-size: 1.05em;
    padding: .75em .5em;
    flex-basis: 0;
    font-weight: bold;
    
    &:nth-child(1) {
      background-color: #aaa;
      color: #fff;
      flex-grow: 1;
    }
    &:nth-child(2) {
      background-color: #f03d4e;
      color: #fff;
      flex-grow: 2;
    }
  }
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 30px;
  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.8em;
  }
`;


function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <>
      <GlobalStyle>
      </GlobalStyle>
      <Alert />
      <Wrapper>
        <Routes>
          {/* private */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<List />} />
            <Route path="/article/*" element={<ArticleLayout />} />
          </Route>
          {/* public */}
          <Route path="/*" element={<UserLayout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

      </Wrapper>
    </>
  );
}

export default App;
