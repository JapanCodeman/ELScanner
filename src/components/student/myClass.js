import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart } from '../chart';

import PageTitler from '../helpers/pageTitler';

function MyClass(props) {

  useEffect(() => {
    const getClassWordCounts = async () => {
      await axios.get('https://elscanner-backend.herokuapp.com/get-all-classes-info')
      .then(response => {
        setClassInfo({
          labels: response.data?.map((classes) => classes.class),
          datasets: [
            {
              label: "Class",
              data: response.data?.map((classes) => classes.classWordsRead),
              backgroundColor: [
                "#ffbb11",
                "#4FFF33",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
              ] 
            }
          ]
        })
      })
      .catch(error => {
        console.log("There was an error in getClassWordCounts()", error)
      })
    }
    getClassWordCounts()
  }, []);

  const [classInfo, setClassInfo] = useState({
    labels: [],
    datasets: []
  })

  return (
    <div className='my-class-wrapper'>
      <PageTitler pagetitle={'My Class'} />
      <PageTitler pagetitle={props.class} />
      <BarChart chartData={classInfo} />
    </div>
  );
}

export default MyClass;