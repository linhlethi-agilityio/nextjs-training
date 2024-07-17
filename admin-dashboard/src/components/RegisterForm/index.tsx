'use client';

import { useRouter } from 'next/navigation';
import { useMemo, KeyboardEvent, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from '@chakra-ui/react';

// Constants
import {
  ERROR_MESSAGES,
  MIN_PASSWORD_LENGTH,
  ROUTES,
  SUCCESS_MESSAGES,
} from '@/constants';

// Utils
import {
  clearErrorOnChange,
  isEnableSubmitButton,
  isValidEmail,
  isValidString,
} from '@/utils';

// Icons
import { EmailIcon, PasswordIcon, UsersIcon } from '@/icons';

interface RegisterFormData {
  email: string;
  name: string;
  password: string;
  role: string;
  confirmPassword: string;
}

const initFormData = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
};

const REQUIRED_FIELDS = [
  'email',
  'name',
  'password',
  'confirmPassword',
  'role',
];

interface RegisterForm {
  onSubmit: (
    data: Omit<RegisterFormData, 'confirmPassword'>,
  ) => Promise<void | string>;
}

const RegisterForm = ({ onSubmit }: RegisterForm) => {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const {
    control,
    watch,
    formState: { dirtyFields, errors },
    setError,
    clearErrors,
    handleSubmit,
  } = useForm<RegisterFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: initFormData,
  });

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit: boolean = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );
  const isDisableSubmit = !enableSubmit;

  /**
   * Function handle register
   */
  const handleRegister = async (formData: RegisterFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = formData;

    startTransition(async () => {
      const response = await onSubmit(rest);

      if (typeof response === 'string') {
        toast({
          title: response,
          status: 'error',
        });
      } else {
        toast({
          title: SUCCESS_MESSAGES.REGISTER_SUCCESS,
          status: 'success',
        });
        router.push(ROUTES.LOGIN);
      }
    });
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(handleRegister)();
    }
  };

  return (
    <FormControl mt={50} onKeyDown={handleOnKeyDown} maxW={500}>
      {/* Email */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: ERROR_MESSAGES.FIELD_REQUIRED,
          validate: (email) =>
            isValidEmail(email) || ERROR_MESSAGES.INVALID_EMAIL,
        }}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Box
            marginBottom={error?.message ? 0 : 26}
            _placeholder={{ color: 'textPlaceholder' }}
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="textPlaceholder" />
              </InputLeftElement>
              <Input
                id="email"
                placeholder="Your email"
                isInvalid={!!error?.message}
                onChange={(e) => {
                  onChange(e.target.value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                {...rest}
              />
            </InputGroup>

            {error?.message && (
              <FormHelperText
                color="red.400"
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

      {/* Name */}
      <Controller
        name="name"
        control={control}
        rules={{
          required: ERROR_MESSAGES.FIELD_REQUIRED,
          validate: (name: string) => isValidString(name),
        }}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Box
            marginBottom={error?.message ? 0 : 26}
            _placeholder={{ color: 'textPlaceholder' }}
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <UsersIcon color="textPlaceholder" />
              </InputLeftElement>
              <Input
                id="name"
                placeholder="Your name"
                isInvalid={!!error?.message}
                onChange={(e) => {
                  onChange(e.target.value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                {...rest}
              />
            </InputGroup>

            {error?.message && (
              <FormHelperText
                color="red.400"
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

      {/* Password */}
      <Controller
        name="password"
        control={control}
        rules={{
          required: ERROR_MESSAGES.FIELD_REQUIRED,
          minLength: {
            value: MIN_PASSWORD_LENGTH,
            message: ERROR_MESSAGES.MIN_PASSWORD_LENGTH(MIN_PASSWORD_LENGTH),
          },
          validate: (value: string) => {
            if (
              watch('confirmPassword') &&
              watch('confirmPassword') !== value
            ) {
              setError('confirmPassword', {
                type: 'manual',
                message: ERROR_MESSAGES.PASSWORD_NOT_MATCH,
              });

              return '';
            }
          },
        }}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Box
            marginBottom={error?.message ? 0 : 26}
            _placeholder={{ color: 'textPlaceholder' }}
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <PasswordIcon />
              </InputLeftElement>
              <Input
                w="full"
                id="password"
                placeholder="Password"
                type="password"
                isInvalid={!!error?.message}
                onChange={(e) => {
                  onChange(e.target.value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                  clearErrorOnChange('confirmPassword', errors, clearErrors);
                }}
                {...rest}
              />
            </InputGroup>

            {error?.message && (
              <FormHelperText
                color="red.400"
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

      {/* Confirm Password */}
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: ERROR_MESSAGES.FIELD_REQUIRED,
          validate: (value: string) => {
            if (watch('password') !== value) {
              return ERROR_MESSAGES.PASSWORD_NOT_MATCH;
            }
          },
        }}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Box
            marginBottom={error?.message ? 0 : 26}
            _placeholder={{ color: 'textPlaceholder' }}
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <PasswordIcon />
              </InputLeftElement>
              <Input
                w="full"
                id="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                isInvalid={!!error?.message}
                onChange={(e) => {
                  onChange(e.target.value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                {...rest}
              />
            </InputGroup>

            {error?.message && (
              <FormHelperText
                color="red.400"
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
        name="role"
        control={control}
        rules={{
          required: ERROR_MESSAGES.FIELD_REQUIRED,
        }}
        render={({ field: { onChange, value, ...rest } }) => (
          <Box>
            <FormLabel fontSize="sm" color="textDark">
              Role:
            </FormLabel>
            <RadioGroup
              defaultValue={value}
              mb={4}
              onChange={onChange}
              {...rest}
            >
              <Stack spacing={12} direction="row">
                <Radio flex={1} value="admin">
                  Admin
                </Radio>
                <Radio flex={1} value="user">
                  User
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        )}
      />

      <Button
        isDisabled={isDisableSubmit}
        isLoading={isPending}
        colorScheme="brand"
        aria-label="register"
        w="-webkit-fill-available"
        mt={2}
        onClick={handleSubmit(handleRegister)}
      >
        Register
      </Button>
    </FormControl>
  );
};

export default RegisterForm;
