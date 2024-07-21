import React from 'react';

import { Button, ButtonProps } from 'shared/ui/kit';

import { model } from '../model';

export const CreateOrderButton: React.FC<{ courseId: string } & ButtonProps> = ({
  courseId,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        fontWeight: 900,
        width: '100%',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        border: 'none',
        py: '21px',
      }}
      onClick={() => model.createOrderRequested(courseId)}
      {...props}
    >
      Записатися на курс
    </Button>
  );
};
