import { memo, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import isEqual from 'react-fast-compare';

// Constants
import { ERROR_MESSAGES, OPTIONS_STATUS } from '@/constants';

// Types
import { Order } from '@/types';

// Utils
import { clearErrorOnChange, isEnableSubmitButton } from '@/utils';

// Components
import { CustomModal, Dropdown } from '@/components';

interface CustomerModalDetailModalProps {
  isOpen: boolean;
  handleSubmitForm: (data: Partial<Order>) => void;
  onClose: () => void;
}

const REQUIRED_FIELDS = ['customerId', 'status', 'products', 'payment'];

const OrderModalUI = ({
  isOpen,
  onClose,
  handleSubmitForm,
}: CustomerModalDetailModalProps) => {
  const {
    control,
    formState: { dirtyFields, errors },
    clearErrors,
    handleSubmit,
  } = useForm<Order>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      product: '',
      customer: '',
      status: '',
      deadline: '',
      price: null,
    },
  });

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit: boolean = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );
  const isDisableSubmit = !enableSubmit;

  const handleOnSubmit = async (formData: Partial<Order>) => {
    handleSubmitForm(formData);
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="New Order" size="3xl">
      <FormControl textAlign="center">
        {/* Name */}
        <Controller
          name="product"
          control={control}
          rules={{
            required: ERROR_MESSAGES.FIELD_REQUIRED,
          }}
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Box marginBottom={error?.message ? 0 : 25}>
              <FormLabel fontSize="sm">Product</FormLabel>
              <Input
                data-testid="product"
                isInvalid={!!error?.message}
                onChange={(e) => {
                  onChange(e.target.value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                {...rest}
              />
              {error?.message && (
                <FormHelperText
                  color="red.500"
                  fontSize="xs"
                  mb={1}
                  textAlign="left"
                >
                  {error.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />

        <Controller
          name="customer"
          control={control}
          rules={{
            required: ERROR_MESSAGES.FIELD_REQUIRED,
          }}
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Box marginBottom={error?.message ? 0 : 25}>
              <FormLabel fontSize="sm">Customer</FormLabel>
              <Input
                data-testid="customer"
                isInvalid={!!error?.message}
                onChange={(e) => {
                  onChange(e.target.value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                {...rest}
              />
              {error?.message && (
                <FormHelperText
                  color="red.500"
                  fontSize="xs"
                  mb={1}
                  textAlign="left"
                >
                  {error.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />

        <Controller
          name="status"
          control={control}
          rules={{
            required: ERROR_MESSAGES.FIELD_REQUIRED,
          }}
          render={({ field: { name, onChange }, fieldState: { error } }) => (
            <Box mb={21}>
              <FormLabel fontSize="sm">Status</FormLabel>
              <Dropdown
                onChangeValue={(value: string) => {
                  onChange(value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                w="full"
                size="md"
                options={OPTIONS_STATUS}
                placeholder="Select status"
              />

              {error?.message && (
                <FormHelperText
                  color="red.500"
                  fontSize="xs"
                  mb={1}
                  textAlign="left"
                >
                  {error.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />

        <Controller
          name="deadline"
          control={control}
          rules={{ required: ERROR_MESSAGES.FIELD_REQUIRED }}
          render={({
            field: { name, value, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Box marginBottom={error?.message ? 0 : 25}>
              <FormLabel fontSize="sm">Deadline</FormLabel>
              <Input
                color="textDefault"
                data-testid="deadline"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={value}
                isInvalid={!!error?.message}
                onChange={(e) => {
                  onChange(e.target.value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                {...rest}
              />
              {error?.message && (
                <FormHelperText
                  color="red.500"
                  fontSize="xs"
                  mb={1}
                  textAlign="left"
                >
                  {error.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />

        <Controller
          name="price"
          control={control}
          rules={{ required: ERROR_MESSAGES.FIELD_REQUIRED }}
          render={({
            field: { name, value, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Box marginBottom={error?.message ? 0 : 25}>
              <FormLabel fontSize="sm">Price</FormLabel>
              <Input
                data-testid="price"
                type="number"
                value={value || ''}
                isInvalid={!!error?.message}
                onChange={(e) => {
                  onChange(e.target.value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                {...rest}
              />
              {error?.message && (
                <FormHelperText
                  color="red.500"
                  fontSize="xs"
                  mb={1}
                  textAlign="left"
                >
                  {error.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />

        <Button
          colorScheme="brand"
          aria-label="button-submit"
          type="submit"
          w="full"
          disabled={isDisableSubmit}
          marginBottom={5}
          onClick={handleSubmit(handleOnSubmit)}
        >
          Submit
        </Button>
      </FormControl>
    </CustomModal>
  );
};

export const OrderModal = memo(OrderModalUI, isEqual);
