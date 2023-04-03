import Joi from "joi";

export const createCommentSchema = Joi.object()
    .keys({
      comment: Joi.string().required().max(500)
    })

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};