import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { csv2jsonAsync } from 'json-2-csv';
import React, { createRef, useCallback } from 'react';

import { usePomoTask } from '@/hooks/usePomoTask';

const DataSyncCSV = () => {
  const fileInputRef = createRef<HTMLInputElement>();
  const { setTask, getAllTasks, createCSVExport } = usePomoTask();

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

  const handleImportOpen = useCallback(() => {
    fileInputRef.current?.click();
  }, [getAllTasks]);

  const handleCSVImport = useCallback(async () => {
    const ref = fileInputRef.current?.files;
    const [file] = ref ? Array.from(ref) : [];
    const contents = await file?.text();
    const tasksData = await csv2jsonAsync(contents);

    if (tasksData?.length > 0) {
      tasksData.filter((el) => el.id).forEach((el) => setTask(el));
    }
  }, []);

  return (
    <Box width="50%" margin="0 auto" display="flex" flexDirection="column">
      <Box height={10} />
      <Button variant="outlined" onClick={handleExport}>
        exportar a csv
      </Button>

      <Box height={10} />

      <Button variant="outlined" onClick={handleImportOpen}>
        importar desde csv
      </Button>

      <input ref={fileInputRef} type="file" accept="text/csv" style={{ display: 'none' }} onChange={handleCSVImport} />
    </Box>
  );
};

export default DataSyncCSV;
