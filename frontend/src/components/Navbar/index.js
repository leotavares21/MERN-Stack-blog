import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';

import { FiSearch, FiUser } from 'react-icons/fi';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

import { UserContext } from '../../context/UserContext';
import api from '../../services/api';

import { Nav, NavList, FormSearch, UserAction, Notifications } from './styles';
import ConfirmAlert from '../../objects/ConfirmAlert';

export default function Navbar() {
  const [textSearch, setTextSearch] = useState('');
  const history = useHistory();
  const [barOpened, setBarOpened] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);
  const [userSetup, setUserSetup] = useState(false);
  const [openNots, setOpenNots] = useState(false);
  const [cookies, setCookies] = useState(true);
  const formRef = useRef();
  const setupRef = useRef();
  const inputFocus = useRef();
  const menuRef = useRef();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem('cookie-blog-fides')) {
      setCookies(false);
    }
  }, [cookies]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (textSearch) {
        const res = await api.post(`/api/search/?text=${textSearch}`);
        history.push({ pathname: '/pesquisa', state: { search: res.data } });
      } else {
        ToastsStore.error('Digite algo');
      }
    } catch (err) {
      history.push({ pathname: '/pesquisa', state: { search: '' } });
    }
  };

  const handleOpenMenu = () => {
    setMenuOpened((menuOpened) => !menuOpened);
  };

  const handleSetup = (e) => {
    setUserSetup((userSetup) => !userSetup);
    setOpenNots(false);
  };

  const handleNotsClickSetup = (e) => {
    setUserSetup(false);
    setOpenNots(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser('');
    history.push('/');
  };

  function useOutClickSetup() {
    useEffect(() => {
      /**
       * setState if clicked on outside of element
       */
      function handleClickOutside(e) {
        if (setupRef.current && !setupRef.current.contains(e.target)) {
          handleNotsClickSetup();
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [setupRef]);
  }

  function useOutClickMenu() {
    useEffect(() => {
      function handleClickOutside(e) {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          setMenuOpened(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [menuRef]);
  }

  const handleCookies = () => {
    localStorage.setItem('cookie-blog-fides', true);
    setCookies(false);
  };

  useOutClickSetup();
  useOutClickMenu();

  return (
    <header ref={menuRef}>
      <Nav menuOpened={menuOpened}>
        <div>
          <Link to="/">
            <h1>Blog</h1>
          </Link>
          <NavList menuOpened={menuOpened}>
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/categoria/esporte">Esporte</Link>
            </li>
            <li>
              <Link to="/categoria/cultura">Cultura</Link>
            </li>
            <li>
              <Link to="/categoria/religiao">Religião</Link>
            </li>
            <li>
              <Link to="/categoria/politica">Política</Link>
            </li>
          </NavList>
        </div>

        <div>
          <FormSearch
            baropened={barOpened}
            onClick={() => {
              setBarOpened(1);
              inputFocus.current.focus();
            }}
            onFocus={() => {
              setBarOpened(1);
              inputFocus.current.focus();
            }}
            onBlur={() => {
              setBarOpened(0);
            }}
            ref={formRef}
          >
            <button
              onClick={onFormSubmit}
              baropened={barOpened}
              aria-label="pesquisar"
            >
              <FiSearch />
            </button>

            <input
              type="search"
              onChange={(e) => setTextSearch(e.target.value)}
              ref={inputFocus}
              value={textSearch}
              baropened={barOpened}
              placeholder="Pesquisar..."
            />
          </FormSearch>

          {user.username ? (
            <UserAction openSetup={userSetup} ref={setupRef}>
              <section>
                <div onClick={handleSetup}>{user.username.charAt(0)}</div>
                <span onClick={handleSetup}>
                  {userSetup ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                </span>
                <ul>
                  <small>{user.username}</small>
                  {user.role === 'admin' ? (
                    <Link to="/admin">
                      <li>Painel</li>
                    </Link>
                  ) : (
                    ''
                  )}
                  <Link to="/config">
                    <li>Configurações</li>
                  </Link>
                  <li onClick={() => setOpenNots((openNots) => !openNots)}>
                    Notificações
                  </li>
                  <button onClick={handleSignOut}>Sair</button>
                </ul>
              </section>

              {user.notifications.length !== 0 ? (
                <Notifications shownots={openNots}>
                  {user.notifications.map((nots) => (
                    <Link to={nots.link} onClick={handleNotsClickSetup}>
                      {nots.text}
                    </Link>
                  ))}
                </Notifications>
              ) : (
                ''
              )}
            </UserAction>
          ) : (
            <Link to="/entrar" aria-label="entrar">
              <FiUser />
            </Link>
          )}

          <button onClick={handleOpenMenu} aria-label="abrir menú">
            <div></div>
            <div></div>
            <div></div>
          </button>
        </div>
      </Nav>
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_CENTER}
      />

      <ConfirmAlert open={cookies}>
        <p>
          Usamos cookies para melhorar e personalizar sua experiência. Ao
          acessar o site, você concorda com a nossa{' '}
          <Link to="/politica-de-privacidade">Política de Privacidade</Link>.
        </p>
        <div>
          <button onClick={handleCookies}>OK</button>
        </div>
      </ConfirmAlert>
    </header>
  );
}
