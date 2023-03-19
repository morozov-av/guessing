import { Button, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import NumInput, { HTMLNumericElement } from 'material-ui-numeric-input';
import { ChangeEvent, FC, useState } from 'react';
import { FlexContainer, ItemWrapper } from '../Sider/Styled';

const InputButton = styled(Button)(() => ({
  minWidth: '40px',
  height: '40px',
  margin: '0 .5rem'
}));

type NumericInputProps = {
  initialValue: number,
  step: number,
  precision: number,
  min: number,
  max: number,
  label: string
}

export const NumericInput: FC<NumericInputProps> = ({
  initialValue,
  step,
  precision,
  max,
  min,
  label
}) => {
  const [ value, setValue ] = useState<number>(initialValue);

  const increment = () => {
    setValue((prev) => prev + step);
  };

  const decrement = () => {
    setValue((prev) => prev - step);
  };

  const handleChange = (e: ChangeEvent<HTMLNumericElement>) => {
    const { value } = e.target;

    if (!value) {
      setValue(0);
    }

    if (typeof value === 'number') {
      setValue(value);
    }
  };

  return(
    <ItemWrapper>
      <FlexContainer>
        <InputLabel htmlFor="my-input">{label}</InputLabel>
      </FlexContainer>
      <FlexContainer>
        <InputButton variant="outlined" disabled={value <= min} onClick={decrement}>-</InputButton>
        <NumInput
          value={value}
          aria-describedby="my-helper-text"
          id="my-input"
          name='example'
          precision={precision}
          decimalChar='.'
          thousandChar=','
          onChange={handleChange}
          variant='outlined'
          size="small"
        />
        <InputButton variant="outlined" disabled={value >= max} onClick={increment}>+</InputButton>
      </FlexContainer>
    </ItemWrapper>
  );
};
