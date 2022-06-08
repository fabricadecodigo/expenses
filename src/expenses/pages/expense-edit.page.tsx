import { FormEvent, FunctionComponent, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useExpenseLazyQuery,
  ExpenseCreateInput,
  ExpenseUpdateInput,
} from '../../generated/graphql';

interface ExpenseEditPageProps {}

export const ExpenseEditPage: FunctionComponent<ExpenseEditPageProps> = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [day, setDay] = useState<number>();
  const [description, setDescription] = useState<string>('');
  const [paid, setPaid] = useState<boolean>(false);
  const [getExpense, { loading: getLoading }] = useExpenseLazyQuery();
  const [createExpense, { loading: createLoading }] =
    useCreateExpenseMutation();
  const [updateExpense, { loading: updateLoading }] =
    useUpdateExpenseMutation();

  const isLoading = getLoading || createLoading || updateLoading;

  useEffect(() => {
    if (id) {
      getExpense({
        variables: {
          id,
        },
      }).then((response) => {
        setDay(response?.data?.expense?.day);
        setDescription(response?.data?.expense?.description || '');
        setPaid(response?.data?.expense?.paid || false);
      });
    }
  }, [id, getExpense]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const data = { day, description, paid };
      if (id) {
        // atualizar
        await updateExpense({
          variables: {
            data: { ...data } as ExpenseUpdateInput,
            where: {
              id,
            },
          },
        });
      } else {
        // criar
        await createExpense({
          variables: {
            data: { ...data } as ExpenseCreateInput,
          },
        });
      }
      navigate('/');
    }
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
            min={1}
            max={31}
            value={day || ''}
            onChange={(event) => {
              setDay(Number(event.target.value));
            }}
          />
          <Form.Control.Feedback type='invalid'>
            Informe o dia do vencimento entre 1 e 31.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type='text'
            placeholder='Conta de luz'
            required
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <Form.Control.Feedback type='invalid'>
            Informe a descrição.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check
            type='checkbox'
            label='Pago'
            checked={paid}
            onChange={(event) => {
              setPaid(Boolean(event.target.checked));
            }}
          />
        </Form.Group>
        <div className='d-grid d-md-block'>
          <Button variant='primary' type='submit' disabled={isLoading}>
            {isLoading && <Spinner size='sm' animation='border' />} Salvar
          </Button>
        </div>
      </Form>
    </Card>
  );
};
