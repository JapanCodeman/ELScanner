import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import PageTitler from '../helpers/pageTitler';

function AdminProfile() {

  const location = useLocation()

  const [admin, setAdmin] = useState({
    ...location.state
  })

  return (
    <div>
      <PageTitler pagetitle={location.state} />
    </div>
  );
}

export default AdminProfile;