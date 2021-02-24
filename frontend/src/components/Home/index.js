import React from 'react';

import Main from '../Main';
import RecentPosts from '../RecentPosts';
import EditorPicks from '../EditorPicks';
import NewsLetter from '../NewsLetter';

export default function Home() {
  const tokenExpires = () => {
    const token = localStorage.getItem('token');
    const now = new Date();
    const dateNow = now.setHours(now.getHours());
    const currentToken = JSON.parse(token);

    if (
      token &&
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(
        currentToken.jwt
      )
    ) {
      if (currentToken.expires && dateNow - currentToken.expires >= 86400000) {
        localStorage.removeItem('token');
      }
    }
  };

  tokenExpires();

  return (
    <>
      <Main />
      <RecentPosts />
      <EditorPicks />
      <NewsLetter />
    </>
  );
}
