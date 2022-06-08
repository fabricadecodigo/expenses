import { FunctionComponent } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Expense } from "../../generated/graphql";
import { ExpenseItemComponent } from "./expense-item";

interface ExpenseListItemComponentProps {
  loading: boolean;
  expenses: Expense[];
  onDeleteClicked: (expense: Expense) => Promise<void>;
  onUpdateClicked: (expense: Expense) => Promise<void>;
  onRestartClicked: () => Promise<void>;
}

export const ExpenseListComponent: FunctionComponent<
  ExpenseListItemComponentProps
> = ({
  loading,
  expenses,
  onDeleteClicked: onDeleteExecuted,
  onUpdateClicked: onUpdateExecuted,
  onRestartClicked,
}) => {
  return (
    <>
      <div className="d-flex flex-column gap-2">
        {loading ? (
          <div className="align-self-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            {expenses
              .filter((e) => !e.paid)
              .map((expense) => (
                <ExpenseItemComponent
                  key={expense.id}
                  expense={expense as Expense}
                  onDeleteClicked={onDeleteExecuted}
                  onUpdateClicked={onUpdateExecuted}
                />
              ))}

            <h2 className="text-center my-2">Contas pagas</h2>
            <div className="d-flex justify-content-end mb-3">
              <Button
                variant="outline-primary"
                className="flex-grow-1 flex-lg-grow-0"
                onClick={onRestartClicked}
              >
                Reiniciar
              </Button>
            </div>

            {expenses
              .filter((e) => e.paid)
              .map((expense) => (
                <ExpenseItemComponent
                  key={expense.id}
                  expense={expense as Expense}
                  onDeleteClicked={onDeleteExecuted}
                  onUpdateClicked={onUpdateExecuted}
                />
              ))}
          </>
        )}
      </div>
    </>
  );
};
