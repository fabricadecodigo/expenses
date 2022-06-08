import { useState } from "react";

export function useForm<T>(initialState: T, callback: (values: T) => Promise<void>) {
  const [values, setValues] = useState<T>(initialState);
  const [validated, setValidated] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setValues({ ...values, [event.target.name]: value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      await callback(values);
    }
  };

  return {
    values,
    setValues,
    onChange,
    onSubmit,
    validated,
  };
}
