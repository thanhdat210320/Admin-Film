import * as yup from "yup";

export const validateConfirmPassword = (field = "newPassword") => {
  return yup
    .string()
    .required(`Xác nhận mật khẩu không được để trống.`)
    .max(40, "Mật khẩu tối đa 40 ký tự!")
    .min(6, "Mật khẩu tối thiểu 6 ký tự!")
    .oneOf([yup.ref(field), null], "Mật khẩu nhập lại không khớp");
};

export const validateDifferentPassword = (field = "oldPassword") => {
  return yup
    .string()
    .required(`Mật khẩu không được để trống.`)
    .max(40, "Mật khẩu tối đa 40 ký tự!")
    .min(6, "Mật khẩu tối thiểu 6 ký tự!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,40})/,
      "Mật khẩu phải có từ 6 đến 32 ký tự, có ký tự chữ số, chữ hoa và chữ thường."
    )
    .notOneOf([yup.ref(field), null], "Mật khẩu mới không được trùng với mật khẩu cũ");
};
