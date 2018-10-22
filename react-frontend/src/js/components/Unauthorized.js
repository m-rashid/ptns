import React from 'react';
import { auth } from '../../firebase';
const Unauthorized = () =>
<div className="text-center" style={{marginTop: 100, paddingLeft: 70}}>
  <h2>You are not authorized to use this page. Please log-in with an administrator account</h2>
<br />
<br />
  <button
    type="button"
    onClick={auth.doSignOut}
  >
    Log in
  </button>
</div>

export default Unauthorized;
