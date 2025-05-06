import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaPhone, FaCommentDots } from 'react-icons/fa';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      message: '',
      updates: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(4, 'Імʼя має містити мінімум 4 символи')
        .required('Це поле обов’язкове'),
      email: Yup.string()
        .email('Неправильна адреса електронної пошти')
        .required('Це поле обов’язкове'),
      phone: Yup.string()
        .matches(/^\+380\d{9}$/, 'Формат телефону має бути +380XXXXXXXXX')
        .required('Це поле обов’язкове'),
      message: Yup.string()
        .min(10, 'Повідомлення має бути не менше 10 символів')
        .required('Це поле обов’язкове'),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        resetForm();
      }, 3000);
    },
  });

  return (
    <div className="form-wrapper">
      <h1>Зв'язатися з нами</h1>
      <p>Залиш нам повідомлення, а ми відповімо якнайшвидше</p>

      <form onSubmit={formik.handleSubmit}>
        <label>
          <FaUser style={{ marginRight: '8px' }} />
          Імʼя та прізвище
        </label>
        <input
          name="fullName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.fullName}
          onBlur={formik.handleBlur}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <div className="error">{formik.errors.fullName}</div>
        )}

        <label>
          <FaEnvelope style={{ marginRight: '8px' }} />
          Email
        </label>
        <input
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}

        <label>
          <FaPhone style={{ marginRight: '8px' }} />
          Телефон (у форматі +380)
        </label>
        <input
          name="phone"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.phone}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="error">{formik.errors.phone}</div>
        )}

        <label>
          <FaCommentDots style={{ marginRight: '8px' }} />
          Повідомлення
        </label>
        <textarea
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
          onBlur={formik.handleBlur}
        />
        {formik.touched.message && formik.errors.message && (
          <div className="error">{formik.errors.message}</div>
        )}

        <label>
          <input
            name="updates"
            type="checkbox"
            onChange={formik.handleChange}
            checked={formik.values.updates}
          />
          Надсилати мені оновлення про академію
        </label>

        <button type="submit">Надіслати</button>
        <div className={`success ${isSubmitted ? 'show' : 'hide'}`}>
          Ваш запит було надіслано!
        </div>
      </form>
    </div>
  );
};

export default ContactForm;