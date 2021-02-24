import React, { useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';

import { AdminContainer, AddWriter } from './styles';

import CategoriesAdmin from '../CategoriesAdmin';
import PostsAdmin from '../PostsAdmin';

export default function Admin() {
  const location = useLocation();
  const history = useHistory();

  const handleMsgToast = () => {
    if (location.state) {
      ToastsStore.success(location.state.success);
      history.replace();
    }
  };

  useEffect(() => {
    handleMsgToast();
  });

  return (
    <AdminContainer>
      <h2>Painel de gerenciamento</h2>

      <Link to="/admin/adicionar-escritor">
        Adicionar escritor <AddWriter />
      </Link>

      <div>
        <CategoriesAdmin />
        <PostsAdmin />
      </div>

      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_CENTER}
      />
    </AdminContainer>
  );
}
