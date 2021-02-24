import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Wrapper } from './styles';
import AuthProvider from '../../context/AuthContext';
import UserProvider from '../../context/UserContext';
import ScrollToTop from '../ScrollToTop';

import Navbar from '../Navbar';
import Home from '../Home';
import Footer from '../Footer';

import Admin from '../../pages/Admin';
import UserConfig from '../../pages/UserConfig';
import SignIn from '../../pages/SingIn';
import SignUp from '../../pages/SignUp';
import ForgotPassword from '../../pages/ForgotPassword';
import NewPost from '../../pages/NewPost';
import NewCategory from '../../pages/NewCategory';
import PostsByCategory from '../../pages/PostsByCategory';
import PublicPost from '../../pages/PublicPost';
import AllPosts from '../../pages/AllPosts';
import Searchs from '../../pages/Searchs';
import AddWriter from '../../pages/AddWriter';
import AllEditorPicks from '../../pages/AllEditorPicks';
import {
  AdminRoute,
  WriterRoute,
  UserRoute,
} from '../../PrivateRoute/PrivateRoute';

export default function Layout() {
  return (
    <Router>
      <ScrollToTop />
      <UserProvider>
        <Navbar />
      </UserProvider>
      <Wrapper>
        <UserProvider>
          <Route path="/" exact component={Home} />
          <Route path="/postagens" component={AllPosts} />
          <Route path="/pesquisa" component={Searchs} />
          <Route path="/escolhas-do-editor" component={AllEditorPicks} />
          <Route path="/postagem/:slug/:slug" exact component={PublicPost} />
          <Route path="/recuperar-senha" exact component={ForgotPassword} />
          <Route
            path="/recuperar-senha/:token"
            exact
            component={ForgotPassword}
          />
          <UserRoute path="/config" component={UserConfig} />
          <Route path="/categoria/:slug" component={PostsByCategory} />
        </UserProvider>

        <Route path="/cadastro" component={SignUp} />
        <Route path="/entrar" component={SignIn} />

        <AuthProvider>
          <AdminRoute path="/admin" exact component={Admin} />
          <AdminRoute path="/admin/adicionar-escritor" component={AddWriter} />
          <AdminRoute path="/admin/nova/categoria" component={NewCategory} />
          <AdminRoute
            path="/admin/editar/categoria/:slug"
            component={NewCategory}
          />
          <AdminRoute path="/admin/nova/postagem" component={NewPost} />
          <AdminRoute path="/admin/editar/postagem/:slug" component={NewPost} />
          <WriterRoute path="/escritor/nova/postagem" component={NewPost} />
          <WriterRoute
            path="/escritor/editar/postagem/:slug"
            component={NewPost}
          />
        </AuthProvider>
      </Wrapper>
      <Footer />
    </Router>
  );
}
