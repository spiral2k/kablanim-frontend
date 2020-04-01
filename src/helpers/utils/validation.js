import validator from 'validator';

export const isPhone = phone => /^(\d+-?)+\d+$/.test(phone);

export const isEmail = email => validator.isEmail(email);

export const isPassword = password => password && password.length > 5;

export const hasValue = value => !!value;
