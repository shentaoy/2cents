import React, { useRef } from 'react';
import { Button } from '@material-ui/core';
import * as d3 from 'd3';
import {parseTransactions} from './transactions/parser';

const importTransactions = (url: any) => {
  try {
    d3.csv(url).then((result) => {
        const processedTransactions = parseTransactions(result);
        console.log(processedTransactions);
    });
  } catch(e) {
    console.log("Transaction import failed" + e.message);
  }
}

const App = () => {
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const handleImportButtonClick = (event: any) => {
    event.preventDefault();
    if (uploadFileRef && uploadFileRef.current) {
      uploadFileRef.current.click();
    }
  }

  const handleImportInputChange = (event: any) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileURL = window.URL.createObjectURL(files[0]);
      importTransactions(fileURL);
    }
  }

  return <div>
    <p>Import your transactions</p>
    <input className="hidden-input" onChange={(e) => handleImportInputChange(e)} ref={uploadFileRef} type="file" accept=".csv" />
    <Button color="primary" onClick={handleImportButtonClick}>Click to import</Button>
  </div>;
}

export default App;
