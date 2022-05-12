import { FormEvent, FunctionComponent, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import {
  useCriarContaMutation,
  useAtualizarContaMutation,
  useContaLazyQuery,
  ContaCreateInput,
  ContaUpdateInput,
} from '../../generated/graphql';

interface ExpenseEditPageProps {}

export const ExpenseEditPage: FunctionComponent<ExpenseEditPageProps> = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [dia, setDia] = useState<number>();
  const [descricao, setDescricao] = useState<string>('');
  const [pago, setPago] = useState<boolean>(false);
  const [getExpense, { loading: getLoading }] = useContaLazyQuery();
  const [createExpense, { loading: createLoading }] = useCriarContaMutation();
  const [updateExpense, { loading: updateLoading }] =
    useAtualizarContaMutation();

  const isLoading = getLoading || createLoading || updateLoading;

  useEffect(() => {
    if (id) {
      getExpense({
        variables: {
          id,
        },
      }).then((response) => {
        setDia(response?.data?.conta?.dia);
        setDescricao(response?.data?.conta?.descricao || '');
        setPago(response?.data?.conta?.pago || false);
      });
    }
  }, [id, getExpense]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const data = { dia, descricao, pago };
      if (id) {
        // atualizar
        await updateExpense({
          variables: {
            data: { ...data } as ContaUpdateInput,
            where: {
              id,
            },
          },
        });
      } else {
        // criar
        await createExpense({
          variables: {
            data: { ...data } as ContaCreateInput,
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
            value={dia || ''}
            onChange={(event) => {
              setDia(Number(event.target.value));
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
            value={descricao}
            onChange={(event) => {
              setDescricao(event.target.value);
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
            checked={pago}
            onChange={(event) => {
              setPago(Boolean(event.target.checked));
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
