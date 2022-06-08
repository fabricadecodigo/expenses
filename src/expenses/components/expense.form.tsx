import React from "react";
import { FunctionComponent, useEffect } from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import { useForm } from "../../hooks/form";
import { IExpenseForm } from "../models/iexpense-form";

interface ExpenseFormComponentProps {
  expense?: IExpenseForm | undefined;
  loading: boolean;
  onFormSubmit: (values: IExpenseForm) => Promise<void>;
}

const ExpenseFormComponent: FunctionComponent<ExpenseFormComponentProps> = ({
  expense,
  loading,
  onFormSubmit,
}) => {
  const { values, validated, setValues, onChange, onSubmit } =
    useForm<IExpenseForm>(
      {
        day: "",
        description: "",
        paid: false,
      },
      onFormSubmit
    );

  useEffect(() => {
    if (expense) {
      setValues(expense);
    }
  }, [expense, setValues]);

  return (
    <Card className="shadow-sm p-4">
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Dia</Form.Label>
          <Form.Control
            type="number"
            name="day"
            placeholder="Informe o dia do vencimento"
            required
            min={1}
            max={31}
            value={values.day}
            onChange={onChange}
          />
          <Form.Control.Feedback type="invalid">
            Informe o dia do vencimento entre 1 e 31.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Conta de luz"
            required
            value={values.description}
            onChange={onChange}
          />
          <Form.Control.Feedback type="invalid">
            Informe a descrição.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            name="paid"
            label="Pago"
            checked={values.paid}
            onChange={onChange}
          />
        </Form.Group>
        <div className="d-grid d-md-block">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading && <Spinner size="sm" animation="border" />} Salvar
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default ExpenseFormComponent;
