import * as yup from 'yup';

export const postSchema = yup.object().shape({
  title: yup.string().required('This field is required'),
  shortContent: yup.number().min(10).required('This field is required'),
  content: yup.number().min(10).required('This field is required'),
  // tag: yup.array().required('This field is required'),
  mainCategory: yup.string().required('This field is required'),
  image: yup.string().required('This field is required'),
});

export const postTitleSchema = yup.object().shape({
  title: yup.string().required('This field is required'),
});

export const postShortContentSchema = yup.object().shape({
  shortContent: yup.number().min(10).required('This field is required'),
});

export const postContentSchema = yup.object().shape({
  content: yup.number().min(10).required('This field is required'),
});

// export const postTagSchema = yup.object().shape({
//   tag: yup.array().min(1).required('This field is required'),
// });

export const postCategorySchema = yup.object().shape({
  mainCategory: yup.number().required('This field is required'),
});

export const postImageSchema = yup.object().shape({
  image: yup.string().required('This field is required'),
});
