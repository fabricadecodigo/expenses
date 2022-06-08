import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  useExpensesQuery,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
  useRestartExpensesMutation,
  Expense,
} from "../../generated/graphql";

import { ExpenseListComponent } from "../components/expense-list";

export const ExpenseListPage: FunctionComponent = () => {
  const {
    data,
    loading: fetchLoading,
    refetch,
  } = useExpensesQuery({
    fetchPolicy: "network-only",
  });
  const [deleteExpense] = useDeleteExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [restartExpenses, { loading: restartLoading }] =
    useRestartExpensesMutation();

  const loading = fetchLoading || restartLoading;

  const handleUpdate = async (expense: Expense) => {
    await updateExpense({
      variables: {
        data: {
          day: expense.day,
          description: expense.description,
          paid: expense.paid,
        },
        where: {
          id: expense.id,
        },
      },
    });
  };

  const handleDelete = async (expense: Expense) => {
    await deleteExpense({
      variables: {
        where: {
          id: expense.id,
        },
      },
    });
    refetch();
  };

  const handleRestartExpenses = async () => {
    await restartExpenses();
    refetch();
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <div>
          <Link to="new">
            <Button variant="primary">Nova despesa</Button>
          </Link>
        </div>
      </div>
      <ExpenseListComponent
        expenses={data?.expenses ? (data?.expenses as Expense[]) : []}
        loading={loading}
        onDeleteClicked={handleDelete}
        onUpdateClicked={handleUpdate}
        onRestartClicked={handleRestartExpenses}
      />
    </>
  );
};
