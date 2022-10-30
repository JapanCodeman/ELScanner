import React, { useEffect, useState } from 'react';
import PageTitler from '../helpers/pageTitler';

function ClassReset(props) {

  const [user, setUser] = useState()

  useEffect(() => {
    props.setLoading(false)
  }, [props])

  const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value})
  }

  return (
    <div className='class-reset'>
      <PageTitler pagetitle='Join New Class' />
      <label className='join-new-class-selector-label'>Join New Class</label>
      <select className='join-new-class-selector' name='class' onChange={handleChange}>
        <option value style={{display:"none", color:"red"}}>select class</option>
        {props.classes?.map(_class => <option value={_class.class} key={_class.public_id}>{_class.class}</option>)}
        <option value={null}>N/A</option>
      </select>
    </div>
  );
}

export default ClassReset;