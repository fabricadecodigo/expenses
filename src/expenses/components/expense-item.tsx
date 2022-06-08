import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Form, Spinner, Modal } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { Expense } from "../../generated/graphql";

interface ExpenseItemComponentProps {
  expense: Expense;
  onDeleteClicked: (expense: Expense) => Promise<void>;
  onUpdateClicked: (expense: Expense) => Promise<void>;
}

export const ExpenseItemComponent: FunctionComponent<
  ExpenseItemComponentProps
> = ({ expense, onDeleteClicked: onDeleteExecuted, onUpdateClicked: onUpdateExecuted }) => {
  const [showModal, setShowModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleUpdate = async (expense: Expense) => {
    try {
      setUpdateLoading(true);
      expense.paid = !expense.paid;
      await onUpdateExecuted(expense);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (expense: Expense) => {
    try {
      setDeleteLoading(true);
      await onDeleteExecuted(expense);
    } finally {
      setShowModal(false);
      setDeleteLoading(false);
    }
  };

  const closeDeleteModal = () => {
    setShowModal(false);
  };

  const openDeleteModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Card
        className={`shadow-sm ${expense.paid ? "bg-light" : ""}`}
        key={expense.id}
      >
        <Card.Body>
          <div className="d-flex align-items-center gap-3">
            <div>
              {updateLoading ? (
                <Spinner size="sm" animation="border" />
              ) : (
                <Form.Check
                  checked={expense.paid}
                  onChange={() => handleUpdate(expense)}
                />
              )}
            </div>
            <div
              className={`
                flex-grow-1 
              ${expense.paid ? "text-decoration-line-through" : ""}`}
            >
              {expense.day} - {expense.description}
            </div>
            <div className="d-flex gap-2">
              <Link to={`edit/${expense.id}`}>
                <Button variant="outline-primary">
                  <BsPencil />
                </Button>
              </Link>
              <Button variant="outline-danger" onClick={openDeleteModal}>
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
            Confirma a exclusão da despesa:{" "}
            <b>{`${expense?.day} - ${expense?.description}?`}</b>
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeDeleteModal}
            disabled={deleteLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(expense)}
            autoFocus
            disabled={deleteLoading}
          >
            {deleteLoading && <Spinner size="sm" animation="border" />} Excluir
            despesa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
