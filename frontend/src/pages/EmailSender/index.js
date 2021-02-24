import React from 'react';

export default function EmailSender(props) {
  return (
    <>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        placeholder="Seu email"
        id="email"
        value={props.email}
        onChange={props.onChangeEmail}
        required
      />
    </>
  );
}
