import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { useContasQuery, Conta } from '../../generated/graphql';
import { ExpenseItemComponent } from '../components/expense-item';

interface ExpenseListPageProps {}

export const ExpenseListPage: FunctionComponent<ExpenseListPageProps> = () => {
  const { data, loading, refetch } = useContasQuery({
    fetchPolicy: 'network-only',
  });

  return (
    <>
      <div className='d-flex justify-content-end mb-3'>
        <div>
          <Link to='new'>
            <Button variant='primary'>Nova despesa</Button>
          </Link>
        </div>
      </div>
      <div className='d-flex flex-column gap-2'>
        {loading && (
          <div className='align-self-center'>
            <Spinner animation='border' />
          </div>
        )}
        {data?.contas
          .filter((c) => !c.pago)
          .map((expense) => (
            <ExpenseItemComponent
              key={expense.id}
              expense={expense as Conta}
              onDeleteExecuted={refetch}
            />
          ))}

        <h2 className='text-center my-2'>Contas pagas</h2>

        {data?.contas
          .filter((c) => c.pago)
          .map((expense) => (
            <ExpenseItemComponent
              key={expense.id}
              expense={expense as Conta}
              onDeleteExecuted={refetch}
            />
          ))}
      </div>
    </>
  );
};
