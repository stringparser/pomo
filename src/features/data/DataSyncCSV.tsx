import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useCallback } from 'react';

import { usePomoTask } from '@/hooks/usePomoTask';
import { createCSVExport } from '@/services/taskStorage';

const DataSyncCSV = () => {
  const { getAllTasks } = usePomoTask();

  const handleExport = useCallback(async () => {
    const blob = await createCSVExport();
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = 'pomo.csv';
    document.body.appendChild(link);

    link.click();

    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }, [getAllTasks]);

  const handleImport = useCallback(() => {
    console.log('do import here');
  }, [getAllTasks]);

  return (
    <Box display="flex" alignItems="center">
      <Button variant="outlined" onClick={handleExport}>
        exportar a csv
      </Button>

      <Box width={10} />

      <Button variant="outlined" onClick={handleImport}>
        importar desde csv
      </Button>
    </Box>
  );
};

export default DataSyncCSV;
