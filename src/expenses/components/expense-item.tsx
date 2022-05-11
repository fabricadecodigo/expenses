import { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form, Spinner, Modal } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';
import {
  Conta,
  useAtualizarContaMutation,
  useExcluirContaMutation,
} from '../../generated/graphql';

interface ExpenseItemComponentProps {
  expense: Conta;
  onDeleteExecuted: () => void;
}

export const ExpenseItemComponent: FunctionComponent<
  ExpenseItemComponentProps
> = ({ expense, onDeleteExecuted }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Conta | null>(null);

  const [excluirConta, { loading: excluirLoading }] = useExcluirContaMutation();
  const [atualizarConta, { loading: atualizarLoading }] =
    useAtualizarContaMutation();

  const handlePagarConta = async (expense: Conta) => {
    await atualizarConta({
      variables: {
        data: {
          pago: !expense.pago,
        },
        where: {
          id: expense.id,
        },
      },
    });
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setSelectedExpense(null);
  };

  const openDeleteModal = (expense: Conta) => {
    setShowModal(true);
    setSelectedExpense(expense);
  };

  const handleDelete = async () => {
    // executar a exclusão
    if (selectedExpense) {
      await excluirConta({
        variables: {
          where: {
            id: selectedExpense.id,
          },
        },
      });
      setSelectedExpense(null);
      onDeleteExecuted();
    }

    setShowModal(false);
  };

  return (
    <>
      <Card
        className={`shadow-sm ${expense.pago ? 'bg-light' : ''}`}
        key={expense.id}
      >
        <Card.Body>
          <div className='d-flex align-items-center gap-3'>
            <div>
              {atualizarLoading ? (
                <Spinner size='sm' animation='border' />
              ) : (
                <Form.Check
                  checked={expense.pago}
                  onChange={() => handlePagarConta(expense as Conta)}
                />
              )}
            </div>
            <div
              className={`
                flex-grow-1 
              ${expense.pago ? 'text-decoration-line-through' : ''}`}
            >
              {expense.dia} - {expense.descricao}
            </div>
            <div className='d-flex gap-2'>
              <Link to={`edit/${expense.id}`}>
                <Button variant='outline-primary'>
                  <BsPencil />
                </Button>
              </Link>
              <Button
                variant='outline-danger'
                onClick={() => openDeleteModal(expense as Conta)}
              >
                <BsTrash />
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={closeDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Excluir despesa</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Confirma a exclusão da despesa:{' '}
            <b>{`${selectedExpense?.dia} - ${selectedExpense?.descricao}?`}</b>
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={closeDeleteModal}
            disabled={excluirLoading}
          >
            Cancelar
          </Button>
          <Button
            variant='danger'
            onClick={handleDelete}
            autoFocus
            disabled={excluirLoading}
          >
            {excluirLoading && <Spinner size='sm' animation='border' />} Excluir
            despesa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
