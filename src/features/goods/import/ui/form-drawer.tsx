import React from 'react';
import { useStore } from 'effector-react';
import * as XLSX from 'xlsx';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from 'shared/ui/kit';

import { OneGoods } from 'entities/goods';

type GoodsData = {
  Brand: string;
  Generic: string;
  'Stock group': string;
  'Stock group 2': string;
  'Stock group 3': string;
  'Total Stock qty': number;
};

const excelUpload = (
  event: ProgressEvent<FileReader>,
  setData: (data: Partial<OneGoods>[]) => void,
) => {
  const workbook = XLSX.read(event.target?.result, { type: 'binary' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const sheetData = XLSX.utils.sheet_to_json<GoodsData>(sheet);

  setData(
    sheetData.map((item, index) => ({
      id: `${index + 1}`,
      name: `${item.Brand} | ${item['Stock group']} ${item['Stock group 2']} ${item['Stock group 3']}`,
      article: item.Generic,
      brand: item.Brand,
      category: item['Stock group'],
      subcategory: `${item['Stock group 2']} ${item['Stock group 3']}`,
      colour: '',
      size: Object.keys(item)
        .filter((key) => !!+key)
        .toString(),
      description: '',
      quantity: item['Total Stock qty'],
      price: '',
      sale: '',
    })),
  );
};

const FileInput: React.FC<{ onDataImport: (data: Partial<OneGoods>[]) => void }> = ({
  onDataImport,
}) => {
  const [data, setData] = React.useState<Partial<OneGoods>[]>([]);
  const [fileName, setFileName] = React.useState<string>('');

  React.useEffect(() => onDataImport(data), [data, onDataImport]);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => excelUpload(e, setData);

    setFileName(file.name);

    reader.readAsBinaryString(file);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button variant="contained" component="label">
          Select File{' '}
          <input
            type="file"
            hidden
            onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
          />
        </Button>
        {!!fileName && <Typography variant="body2">{fileName}</Typography>}
      </Box>
      {!!data.length && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h4">Imported Data:</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {Object.keys(data[0]).map((header) => (
                    <TableCell key={header}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    {Object.values(row).map((cell) => (
                      <TableCell key={cell.toString()}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

import * as model from '../model';
export const ImportGoodsForm: React.FC = () => {
  const [data, setData] = React.useState<Partial<OneGoods>[]>([]);
  const dialogOpen = useStore(model.$dialogOpen);

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => model.dialogOpenRequested(false)}
      sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '100%' } }}
    >
      <DialogTitle>Import goods by excel file</DialogTitle>
      <DialogContent>
        <FileInput onDataImport={(data) => setData(data)} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={() => model.dialogOpenRequested(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => model.createGoodsRequested(data)} autoFocus>
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};
