import React, { useState } from "react";
import {
  IContact,
  useDeleteContactMutation,
  useUpdateContactMutation,
} from "../store/contacts/contacts.api";
import { useAuth } from "../store/hooks";

const ContactCard: React.FC<IContact> = ({ id, name, phone }) => {
  const isAuth = useAuth();
  const [isWarning, setIsWarning] = useState<boolean>(!isAuth);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [formState, setFormState] = useState<IContact>({
    id: id,
    name: name,
    phone: phone,
  });

  const [editContact, { isError: isErrorEdit }] = useUpdateContactMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const [deleteContact, { isError: isErrorDelete }] =
    useDeleteContactMutation();

  const handleClickEdit = () => {
    if (isAuth) {
      if (isEdit) editContact(formState);
      setIsEdit((state) => !state);
    } else {
      setIsWarning(true);
    }
  };
  const handleClickDelete = () => {
    if (isAuth) {
      deleteContact(id);
    } else {
      setIsWarning(true);
    }
  };

  return (
    <div className="contact-card">
      <div className="contact-card-body">
        {isEdit ? (
          <>
            <label className="create-modul-form__label-text-field">
              <span className="create-modul-form__label-text">Имя</span>
              <input
                type="text"
                className="create-modul-form__input"
                value={formState.name}
                onChange={handleChange}
                name="name"
              />
            </label>
            <label className="create-modul-form__label-text-field">
              <span className="create-modul-form__label-text">Телефон</span>
              <input
                type="text"
                className="create-modul-form__input"
                value={formState.phone}
                onChange={handleChange}
                name="phone"
              />
            </label>
          </>
        ) : (
          <>
            <h3 className="contact-card-body__name">{name}</h3>
            <div className="contact-card-body__phone">{phone}</div>
          </>
        )}
      </div>

      <button
        type="button"
        className="contact-card__btn"
        onClick={handleClickEdit}
      >
        {isEdit ? "Готово" : "Редактировать"}
      </button>
      <button
        type="button"
        className="contact-card__btn"
        onClick={handleClickDelete}
      >
        Удалить
      </button>

      {isWarning && (
        <div className="contact-card__warning">Необходимо авторизоваться</div>
      )}
      {(isErrorEdit || isErrorDelete) && (
        <div className="contact-card__warning">
          Ошибка при выполнении операции
        </div>
      )}
    </div>
  );
};

export default React.memo(ContactCard);
