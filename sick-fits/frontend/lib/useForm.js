import { useCallback, useEffect, useState } from 'react';

const useForm = (initial = {}) => {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  const handleChange = useCallback((e) => {
    let { value, name, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs((current) => ({
      ...current,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setInputs(initial);
  }, [initial]);

  const clearForm = useCallback(() => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );

    setInputs(blankState);
  }, [inputs]);

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
};

export default useForm;
