import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';

import api from '../../services/api';

import { Container, Category } from './styles';

import BtnPainel from '../../objects/BtnPainel';
import BtnDelete from '../../objects/BtnDelete';
import BtnEdit from '../../objects/BtnEdit';
import ConfirmAlert from '../../objects/ConfirmAlert';

export default function CategoriesAdmin() {
  const history = useHistory();
  const [openAlert, setOpenAlert] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.get('/api/categories');
    setCategories(res.data);
  };

  const handleOpenAlert = (e, id) => {
    setOpenAlert(true);
    setCategoryId(id);
  };

  const deleteCategory = async () => {
    try {
      const res = await api.delete(`/api/delete/category/${categoryId}`);
      ToastsStore.success(res.data.success);
      setOpenAlert(false);
      fetchData();
    } catch (err) {
      ToastsStore.error(err.response.data.error);
    }
  };

  return (
    <Container>
      <ConfirmAlert open={openAlert}>
        <p>Quer deletar essa categoria?</p>
        <div>
          <button onClick={deleteCategory}>OK</button>
          <button onClick={() => setOpenAlert(false)}>Cancelar</button>
        </div>
      </ConfirmAlert>

      <div>
        <h3>Categorias:</h3>
        <BtnPainel onClick={() => history.push('/admin/nova/categoria')}>
          Criar categoria
        </BtnPainel>
      </div>

      {categories.map((category) => (
        <Category key={category._id}>
          <strong>{category.name}:</strong>
          <div>
            <BtnEdit
              onClick={() =>
                history.push(`/admin/editar/categoria/${category.slug}`)
              }
            >
              Editar
            </BtnEdit>
            <BtnDelete onClick={(e) => handleOpenAlert(e, category._id)}>
              Deletar
            </BtnDelete>
          </div>
        </Category>
      ))}

      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_CENTER}
      />
    </Container>
  );
}
