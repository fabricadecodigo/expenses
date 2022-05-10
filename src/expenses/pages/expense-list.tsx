import { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form, Navbar, Modal } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';

interface ExpenseListPageProps {}
interface IExpense {
  id: string;
  dia: number;
  descricao: string;
  pago: boolean;
}

const expenses: IExpense[] = [
  {
    id: '1',
    dia: 5,
    descricao: 'Conta de luz',
    pago: false,
  },
  {
    id: '2',
    dia: 5,
    descricao: 'Conta de água',
    pago: false,
  },
  {
    id: '3',
    dia: 10,
    descricao: 'Internet',
    pago: false,
  },
  {
    id: '4',
    dia: 20,
    descricao: 'Cartão de crédito',
    pago: false,
  },
];

export const ExpenseListPage: FunctionComponent<ExpenseListPageProps> = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedExpense(null);
  };

  const handleCanDelete = (expense: IExpense) => {
    setShowModal(true);
    setSelectedExpense(expense);
  };

  const handleDelete = () => {
    // executar a exclusão
    setShowModal(false);
    if (selectedExpense) {
      expenses.splice(
        expenses.findIndex((e) => e.id === selectedExpense.id),
        1
      );
    }
  };

  return (
    <>
      {/* <Navbar>
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            <Link to='new'>
              
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar> */}
      <div className='d-flex justify-content-end mb-3'>
        <div>
          <Link to='new'>
            <Button variant='primary'>Nova despesa</Button>
          </Link>
        </div>
      </div>
      <div className='d-flex flex-column gap-2'>
        {expenses.map((expense) => (
          <Card className='shadow-sm' key={expense.id}>
            <Card.Body>
              <div className='d-flex align-items-center gap-3'>
                <div>
                  <Form.Check />
                </div>
                <div className='flex-grow-1'>
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
                    onClick={() => handleCanDelete(expense)}
                  >
                    <BsTrash />
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCancelDelete} centered>
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
          <Button variant='secondary' onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button variant='danger' onClick={handleDelete} autoFocus>
            Excluir despesa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
