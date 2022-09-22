import React, { useState } from "react";
import {
  IContact,
  useCreateContactMutation,
} from "../store/contacts/contacts.api";

const CreateContact: React.FC = () => {
  const [isCreate, setIsCreate] = useState<boolean>(false);

  // const [formState, setFormState] = useState<IContact>({
  const [formState, setFormState] = useState<IContact>({
    id: "",
    name: "",
    phone: "",
  });

  const [createContact, { error: errorContact }] = useCreateContactMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleClickCreate = () => {
    setIsCreate((state) => !state);
  };

  const handleSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createContact(formState);
  };

  return (
    <div className="create-modul">
      <button
        type="button"
        className="create-modul__btn"
        onClick={handleClickCreate}
      >
        {isCreate ? "Отмена" : "Добавить новый контакт"}
      </button>

      {isCreate && (
        <form className="create-modul-form" onSubmit={handleSubmitCreate}>
          <label
            className="create-modul-form__label-text-field"
            htmlFor="nameInput"
          >
            <span className="create-modul-form__label-text">Имя</span>
            <input
              type="text"
              className="create-modul-form__input"
              value={formState.name}
              onChange={handleChange}
              name="name"
              id="nameInput"
            />
          </label>
          <label
            className="create-modul-form__label-text-field"
            htmlFor="phoneInput"
          >
            <span className="create-modul-form__label-text">Телефон</span>
            <input
              type="text"
              className="create-modul-form__input"
              value={formState.phone}
              onChange={handleChange}
              name="phone"
              id="phoneInput"
            />
          </label>
          <button type="submit" className="create-modul-form__button-sign-in">
            Создать
          </button>
        </form>
      )}
      {errorContact && JSON.stringify(errorContact, null, 2)}
    </div>
  );
};

export default CreateContact;
