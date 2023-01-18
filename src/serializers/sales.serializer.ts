import * as yup from 'yup'

export const salesRequestschema = yup.object().shape({
  amount: yup.number().required(),
  clients: yup
    .string()
    .required()
    .matches(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      'Client Id not found'
    ),
  value: yup.number().required(),
})
