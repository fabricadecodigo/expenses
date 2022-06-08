import { FunctionComponent, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useExpenseLazyQuery,
} from "../../generated/graphql";
import ExpenseFormComponent from "../components/expense.form";
import { IExpenseForm } from "../models/iexpense-form";

interface ExpenseEditPageProps {}

export const ExpenseEditPage: FunctionComponent<ExpenseEditPageProps> = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [getExpense, { loading: getLoading }] = useExpenseLazyQuery();
  const [createExpense, { loading: createLoading }] =
    useCreateExpenseMutation();
  const [updateExpense, { loading: updateLoading }] =
    useUpdateExpenseMutation();

  const isLoading = getLoading || createLoading || updateLoading;
  const [expense, setExpense] = useState<IExpenseForm | undefined>(undefined);

  const handleSubmit = async (values: IExpenseForm) => {
    const { day, description, paid } = values;

    if (id) {
      // atualizar
      await updateExpense({
        variables: {
          data: {
            day: Number(day),
            description,
            paid,
          },
          where: {
            id,
          },
        },
      });
    } else {
      // criar
      await createExpense({
        variables: {
          data: {
            day: Number(day),
            description,
            paid,
          },
        },
      });
    }
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      getExpense({
        variables: {
          id,
        },
      }).then((response) => {
        setExpense({
          day: response?.data?.expense?.day.toString() || "",
          description: response?.data?.expense?.description || "",
          paid: response?.data?.expense?.paid || false,
        });
      });
    }
  }, [id, getExpense, setExpense]);

  return (
    <ExpenseFormComponent
      expense={expense}
      loading={isLoading}
      onFormSubmit={handleSubmit}
    />
  );
};
