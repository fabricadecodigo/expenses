import { FormEvent, FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';

interface ExpenseEditPageProps {}

export const ExpenseEditPage: FunctionComponent<ExpenseEditPageProps> = () => {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      console.log('Valido');
    }

    setValidated(true);
  };

  return (
    <Card className='shadow-sm p-4'>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Dia</Form.Label>
          <Form.Control
            type='number'
            placeholder='Informe o dia do vencimento'
            required
          />
          <Form.Control.Feedback type='invalid'>
            Informe o dia do vencimento.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Descrição</Form.Label>
          <Form.Control type='text' placeholder='Conta de luz' required />
          <Form.Control.Feedback type='invalid'>
            Informe a descrição.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Pago' />
        </Form.Group>
        <div className='d-grid d-md-block'>
          <Button variant='primary' type='submit'>
            Salvar
          </Button>
        </div>
      </Form>
    </Card>
  );
};
