import * as yup from 'yup';

export const blogValidationSchema = yup.object().shape({
  name: yup.string().required(),
  css_design: yup.string(),
  user_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
