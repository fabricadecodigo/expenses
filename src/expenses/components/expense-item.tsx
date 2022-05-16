import { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form, Spinner, Modal } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';
import {
  Expense,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} from '../../generated/graphql';

interface ExpenseItemComponentProps {
  expense: Expense;
  onDeleteExecuted: () => void;
}

export const ExpenseItemComponent: FunctionComponent<
  ExpenseItemComponentProps
> = ({ expense, onDeleteExecuted }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const [deleteExpense, { loading: deleteLoading }] =
    useDeleteExpenseMutation();
  const [updateExpense, { loading: updateLoading }] =
    useUpdateExpenseMutation();

  const handlePayExpense = async (expense: Expense) => {
    await updateExpense({
      variables: {
        data: {
          paid: !expense.paid,
        },
        where: {
          id: expense.id,
        },
      },
    });
  };

  const handleDelete = async () => {
    // executar a exclusão
    if (selectedExpense) {
      await deleteExpense({
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

  const closeDeleteModal = () => {
    setShowModal(false);
    setSelectedExpense(null);
  };

  const openDeleteModal = (expense: Expense) => {
    setShowModal(true);
    setSelectedExpense(expense);
  };

  return (
    <>
      <Card
        className={`shadow-sm ${expense.paid ? 'bg-light' : ''}`}
        key={expense.id}
      >
        <Card.Body>
          <div className='d-flex align-items-center gap-3'>
            <div>
              {updateLoading ? (
                <Spinner size='sm' animation='border' />
              ) : (
                <Form.Check
                  checked={expense.paid}
                  onChange={() => handlePayExpense(expense as Expense)}
                />
              )}
            </div>
            <div
              className={`
                        flex-grow-1 
                      ${expense.paid ? 'text-decoration-line-through' : ''}`}
            >
              {expense.day} - {expense.description}
            </div>
            <div className='d-flex gap-2'>
              <Link to={`edit/${expense.id}`}>
                <Button variant='outline-primary'>
                  <BsPencil />
                </Button>
              </Link>
              <Button
                variant='outline-danger'
                onClick={() => openDeleteModal(expense as Expense)}
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
            <b>{`${selectedExpense?.day} - ${selectedExpense?.description}?`}</b>
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={closeDeleteModal}
            disabled={deleteLoading}
          >
            Cancelar
          </Button>
          <Button
            variant='danger'
            onClick={handleDelete}
            autoFocus
            disabled={deleteLoading}
          >
            {deleteLoading && <Spinner size='sm' animation='border' />} Excluir
            despesa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
