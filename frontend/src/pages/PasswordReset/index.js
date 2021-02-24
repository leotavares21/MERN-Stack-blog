import React from 'react';

export default function PasswordReset(props) {
  return (
    <>
      <label htmlFor="newPassword">Nova senha: </label>
      <input
        type="password"
        name="newpassword"
        placeholder="Nova senha"
        id="newPassword"
        value={props.newPassword}
        onChange={props.onChangeNewPassword}
        required
      />

      <label htmlFor="RepeatNewPassword">Repetir senha: </label>
      <input
        type="password"
        name="repeatnewpassword"
        placeholder="Repetir senha"
        id="RepeatNewPassword"
        value={props.newPasswordRepeat}
        onChange={props.onChangeNewPasswordRepeat}
        required
      />
    </>
  );
}
