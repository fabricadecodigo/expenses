import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { useExpensesQuery, Expense } from '../../generated/graphql';
import { ExpenseItemComponent } from '../components/expense-item';

export const ExpenseListPage: FunctionComponent = () => {
  const { data, loading, refetch } = useExpensesQuery({
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
        {data?.expenses
          .filter((e) => !e.paid)
          .map((expense) => (
            <ExpenseItemComponent
              key={expense.id}
              expense={expense as Expense}
              onDeleteExecuted={refetch}
            />
          ))}

        <h2 className='text-center my-2'>Contas pagas</h2>

        {data?.expenses
          .filter((e) => e.paid)
          .map((expense) => (
            <ExpenseItemComponent
              key={expense.id}
              expense={expense as Expense}
              onDeleteExecuted={refetch}
            />
          ))}
      </div>
    </>
  );
};
