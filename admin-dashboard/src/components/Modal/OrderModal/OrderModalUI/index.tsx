'use client';

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

// Constants
import {
  ERROR_MESSAGES,
  OPTIONS_STATUS,
  REGEX_PATTERN,
  REQUIRED_FIELDS,
} from '@/constants';

// Models
import { Customer, Order } from '@/models';

// Utils
import {
  clearErrorOnChange,
  formatDateString,
  getDirtyState,
  isEnableSubmitButton,
  isValidPrice,
  isValidString,
  normalizeValue,
} from '@/utils';

// Components
import { CustomModal, Dropdown } from '@/components';

interface CustomerModalDetailModalProps {
  title?: string;
  isOpen: boolean;
  isLoading?: boolean;
  customers: Customer[];
  previewData?: Order | null;
  onSubmitForm: (data: Partial<Order>) => void;
  onClose: () => void;
}

const initFormData = {
  product: '',
  customerId: '',
  status: '',
  deadline: '',
  price: undefined,
};

const OrderModalUI = ({
  isOpen,
  customers,
  isLoading = false,
  title = 'Add Order',
  previewData = null,
  onClose,
  onSubmitForm,
}: CustomerModalDetailModalProps) => {
  const formattedOrder = {
    ...previewData,
    deadline: formatDateString(previewData?.deadline ?? '', false, true),
  };

  const optionsCustomers = customers.map((customer) => ({
    value: customer.id,
    label: customer.name,
  }));

  const {
    control,
    formState: { dirtyFields, errors, defaultValues },
    clearErrors,
    handleSubmit,
    watch,
  } = useForm<Order>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: formattedOrder ? formattedOrder : initFormData,
  });

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit: boolean = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );

  const isDisableSubmit = !(
    enableSubmit || !getDirtyState(defaultValues ?? {}, watch())
  );

  const handleOnSubmit = (formData: Partial<Order>) => {
    onSubmitForm(formData);
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={title} size="3xl">
      <FormControl textAlign="center">
        {/* Name */}
        <Controller
          name="product"
          control={control}
          rules={{
            required: ERROR_MESSAGES.FIELD_REQUIRED,
            validate: (name) =>
              isValidString(name) || ERROR_MESSAGES.INVALID_NAME('product'),
          }}
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Box marginBottom={error?.message ? 0 : 25}>
              <FormLabel fontSize="sm">Product</FormLabel>
              <Input
                data-testid="product"
                variant="primary"
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
          name="customerId"
          control={control}
          rules={{
            required: ERROR_MESSAGES.FIELD_REQUIRED,
          }}
          render={({
            field: { name, value, onChange },
            fieldState: { error },
          }) => (
            <Box mb={27}>
              <FormLabel fontSize="sm">Customer</FormLabel>
              <Dropdown
                onChangeValue={(value: string) => {
                  onChange(value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                value={value}
                w="full"
                fontSize={14}
                color="textDark"
                options={optionsCustomers}
                placeholder="Select customers"
              />

              {error?.message && (
                <FormHelperText
                  color="textDanger"
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
          render={({
            field: { name, value, onChange },
            fieldState: { error },
          }) => (
            <Box mb={21}>
              <FormLabel fontSize="sm">Status</FormLabel>
              <Dropdown
                onChangeValue={(value: string) => {
                  onChange(value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                value={value}
                w="full"
                fontSize={14}
                color="textDark"
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
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Box marginBottom={error?.message ? 0 : 25}>
              <FormLabel fontSize="sm">Deadline</FormLabel>
              <Input
                color="textDark"
                data-testid="deadline"
                variant="primary"
                type="date"
                min={new Date().toISOString().split('T')[0]}
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
          rules={{
            required: ERROR_MESSAGES.FIELD_REQUIRED,
            validate: (value) =>
              isValidPrice(value!.toString()) || ERROR_MESSAGES.INVALID_PRICE,
          }}
          render={({
            field: { name, value, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Box marginBottom={error?.message ? 0 : 25}>
              <FormLabel fontSize="sm">Price</FormLabel>
              <Input
                data-testid="price"
                value={value || ''}
                variant="primary"
                isInvalid={!!error?.message}
                onChange={(e) => {
                  const value = normalizeValue(e.target.value);

                  const isValidate = REGEX_PATTERN.DECIMAL.test(value);

                  if (isValidate || value === '') onChange(value);

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
          isLoading={isLoading}
          colorScheme="brand"
          aria-label="button-submit"
          type="submit"
          w="full"
          isDisabled={isDisableSubmit}
          marginBottom={5}
          onClick={handleSubmit(handleOnSubmit)}
        >
          Submit
        </Button>
      </FormControl>
    </CustomModal>
  );
};

export default memo(OrderModalUI);
