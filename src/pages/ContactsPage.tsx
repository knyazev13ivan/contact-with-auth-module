import React from "react";
import ContactList from "../componens/ContactList";
import CreateContact from "../componens/CreateContact";

const ContactsPage: React.FC = () => {
  return (
    <div className="contacts-page">
      <CreateContact />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
