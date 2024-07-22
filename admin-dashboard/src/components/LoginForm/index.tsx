'use client';

import { useMemo, KeyboardEvent, useState, memo, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';

// Constants
import { ERROR_MESSAGES, ROUTES, SUCCESS_MESSAGES } from '@/constants';

// Utils
import {
  clearErrorOnChange,
  isEnableSubmitButton,
  isValidEmail,
} from '@/utils';

// Icons
import { EmailIcon, HideEyeIcon, PasswordIcon, ShowEyeIcon } from '@/icons';

interface LoginFormData {
  email: string;
  password: string;
}

const REQUIRED_FIELDS = ['email', 'password'];

interface LoginForm {
  onSubmit: (data: LoginFormData) => Promise<void | string>;
}

const LoginForm = ({ onSubmit }: LoginForm) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    control,
    formState: { dirtyFields, errors },
    clearErrors,
    handleSubmit,
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit: boolean = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );
  const isDisableSubmit = !enableSubmit;

  /**
   * Func handle login
   */
  const handleLogin = async (formData: LoginFormData) => {
    startTransition(async () => {
      const response = await onSubmit(formData);
      console.log('');

      if (typeof response === 'string') {
        toast({
          title: response,
          status: 'error',
        });
      } else {
        toast({
          title: SUCCESS_MESSAGES.LOGIN_SUCCESS,
          status: 'success',
        });
        router.push(ROUTES.PRODUCT);
      }
    });
  };

  const handleClickEyePassword = () => setShowPassword(!showPassword);

  const handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(handleLogin)();
    }
  };

  return (
    <FormControl mt={50} onKeyDown={handleOnKeyDown} maxW={500}>
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
            ml={3}
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

      {/* Password */}
      <Controller
        name="password"
        control={control}
        rules={{
          required: ERROR_MESSAGES.FIELD_REQUIRED,
        }}
        render={({
          field: { name, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Box
            marginBottom={error?.message ? 0 : 26}
            ml={3}
            _placeholder={{ color: 'textPlaceholder' }}
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <PasswordIcon />
              </InputLeftElement>
              <InputRightElement>
                <Button variant="icon" onClick={handleClickEyePassword}>
                  {showPassword ? <ShowEyeIcon /> : <HideEyeIcon />}
                </Button>
              </InputRightElement>
              <Input
                w="full"
                id="password"
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
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

      <Button
        isDisabled={isDisableSubmit}
        isLoading={isPending}
        colorScheme="brand"
        ml={3}
        aria-label="log-in"
        w="-webkit-fill-available"
        mt={2}
        onClick={handleSubmit(handleLogin)}
      >
        Log In
      </Button>
    </FormControl>
  );
};

export default memo(LoginForm);
