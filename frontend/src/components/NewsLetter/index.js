import React from 'react';
import BtnForm from '../../objects/BtnForm';

import { NewsLetterStyle } from './styles';

function NewsLetter() {
  return (
    <NewsLetterStyle>
      <span>Newsletter</span>
      <h3>Inscreva-se na newsletter</h3>
      <form>
        <input type="email" name="newsletter" placeholder="Seu email" />
        <BtnForm type="submit">Inscrever-se</BtnForm>
      </form>
    </NewsLetterStyle>
  );
}

export default NewsLetter;
