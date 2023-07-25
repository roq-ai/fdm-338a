import * as yup from 'yup';

export const postValidationSchema = yup.object().shape({
  text_content: yup.string().required(),
  image: yup.string(),
  video: yup.string(),
  audio: yup.string(),
  user_id: yup.string().nullable(),
  blog_id: yup.string().nullable(),
});
