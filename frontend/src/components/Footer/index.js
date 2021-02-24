import React from 'react';
import { Link } from 'react-router-dom';

import { FooterContainer } from './styles';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <FooterContainer>
      <ul>
        <li>
          <Link to="#">Sobre</Link>
        </li>
        <li>
          <Link to="#">Contato</Link>
        </li>
        <li>
          <Link to="#">Apoiar</Link>
        </li>
      </ul>

      <ul>
        <li>
          <Link to="#">
            <FaFacebookF />
          </Link>
        </li>
        <li>
          <Link to="#">
            <FaTwitter />
          </Link>
        </li>
        <li>
          <Link to="#">
            <FaInstagram />
          </Link>
        </li>
      </ul>
    </FooterContainer>
  );
}

export default Footer;
