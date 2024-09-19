import * as React from 'react';
import {Controller} from 'react-hook-form';

import {MuiOtpInput} from 'mui-one-time-password-input';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@mui/material';

export const VarifyCodeForm = (): React.JSX.Element => {
  return (
    <Card elevation={16}>
      <CardHeader sx={{pb: 0}} title="Verify code" />
      <CardContent>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="code"
            render={({field, fieldState}) => (
              <FormControl error={Boolean(errors.code)}>
                <FormLabel
                  sx={{
                    display: 'block',
                    mb: 2,
                  }}
                >
                  Code
                </FormLabel>
                <MuiOtpInput
                  length={6}
                  // onBlur={() => formik.handleBlur('code')}
                  // onChange={(value) => formik.setFieldValue('code', value)}
                  // onFocus={() => formik.setFieldTouched('code')}
                  sx={{
                    '& .MuiFilledInput-input': {
                      p: '14px',
                    },
                  }}
                  {...field}
                />
                {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <Button fullWidth size="large" sx={{mt: 2}} type="submit" variant="contained">
            Verify
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
