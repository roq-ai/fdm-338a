import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { getPostById, updatePostById } from 'apiSdk/posts';
import { postValidationSchema } from 'validationSchema/posts';
import { PostInterface } from 'interfaces/post';
import { UserInterface } from 'interfaces/user';
import { BlogInterface } from 'interfaces/blog';
import { getUsers } from 'apiSdk/users';
import { getBlogs } from 'apiSdk/blogs';

function PostEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PostInterface>(
    () => (id ? `/posts/${id}` : null),
    () => getPostById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PostInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePostById(id, values);
      mutate(updated);
      resetForm();
      router.push('/posts');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PostInterface>({
    initialValues: data,
    validationSchema: postValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Posts',
              link: '/posts',
            },
            {
              label: 'Update Post',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Post
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.text_content}
            label={'Text Content'}
            props={{
              name: 'text_content',
              placeholder: 'Text Content',
              value: formik.values?.text_content,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.image}
            label={'Image'}
            props={{
              name: 'image',
              placeholder: 'Image',
              value: formik.values?.image,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.video}
            label={'Video'}
            props={{
              name: 'video',
              placeholder: 'Video',
              value: formik.values?.video,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.audio}
            label={'Audio'}
            props={{
              name: 'audio',
              placeholder: 'Audio',
              value: formik.values?.audio,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<BlogInterface>
            formik={formik}
            name={'blog_id'}
            label={'Select Blog'}
            placeholder={'Select Blog'}
            fetcher={getBlogs}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/posts')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'post',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PostEditPage);