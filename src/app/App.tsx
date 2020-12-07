import React, { useRef } from 'react';
import { Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import * as d3 from 'd3';

import {parseTransactions, getMonthlyReport} from '../transactions/parser';
import { getPersistedTransactions, persistTransactions } from '../transactions/storage';
import routes from './routes';
import theme from '../ui/theme';
import GlobalStyles from '../ui/components/GlobalStyles';

const importTransactions = (url: string) => {
  try {
    d3.csv(url).then((result) => {
        const processedTransactions = parseTransactions(result);
        persistTransactions(processedTransactions);
        console.log(getMonthlyReport(processedTransactions));
    });
  } catch(e) {
    console.log("Transaction import failed" + e.message);
  }
}

const App = (): React.ReactElement => {
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const handleImportButtonClick = (event: any) => {
    event.preventDefault();
    if (uploadFileRef && uploadFileRef.current) {
      uploadFileRef.current.click();
    }
  }

  const handleImportInputChange = (event: any) => {
    fileInput();
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileURL = window.URL.createObjectURL(files[0]);
      importTransactions(fileURL);
    }
  }

  const fileInput = () => (<div>
    <p>Import your transactions</p>
    <input className="hidden-input" onChange={(e) => handleImportInputChange(e)} ref={uploadFileRef} type="file" accept=".csv" />
    <Button color="primary" onClick={handleImportButtonClick}>Click to import</Button>
  </div>);

  const persistedTransactions = getPersistedTransactions();
  console.log(getMonthlyReport(persistedTransactions));
  
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useRoutes } = require('react-router-dom');
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
      {fileInput()}
    </ThemeProvider>
  );
}


export default App;
