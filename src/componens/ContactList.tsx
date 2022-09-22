import React from "react";
import { IContact, useGetContactsQuery } from "../store/contacts/contacts.api";
import { useAuth, useSearchValue } from "../store/hooks";
import ContactCard from "./ContactCard";

const ContactList: React.FC = () => {
  const isAuth = useAuth();
  const searchValue = useSearchValue();

  const { data: contacts, error, isLoading } = useGetContactsQuery("");

  return (
    <div>
      {isLoading && 'Loading...'}
      {isAuth && (
        <ul className="contact-list">
          {contacts &&
            contacts
              .slice(0)
              .filter(
                (elem) =>
                  elem.name.includes(searchValue) ||
                  elem.phone.includes(searchValue)
              )
              .map(({id, name, phone}: IContact) => (
                <ContactCard key={id} id={id} name={name} phone={phone} />
              ))}
        </ul>
      )}
      {error && "Ошибка при получении списка контактов"}
    </div>
  );
};

export default React.memo(ContactList);
