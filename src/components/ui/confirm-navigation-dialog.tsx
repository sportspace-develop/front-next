import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type ConfirmNavigationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmNavigationDialog: React.FC<ConfirmNavigationDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Несохранённые изменения</DialogTitle>
      <DialogContent>Вы хотите сохранить изменения перед переходом?</DialogContent>
      <DialogActions sx={{ pb: 2, px: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Отмена
        </Button>
        <Button onClick={onConfirm} variant="contained">
          Перейти без сохранения
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmNavigationDialog;
