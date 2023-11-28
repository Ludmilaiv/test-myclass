const validator = require('validator');

exports.getLessonsValidator = function(params) {
  const {
    date,
    status,
    teacherIds,
    studentsCount,
    page,
    lessonsPerPage
  } = params;

  const result = {
    isValid: true,
    err: null,
  }

  if (date) {
    const dateArray = date.split(",");

    if (!validator.isDate(dateArray[0]) || 
      dateArray.length > 1 && (
        !validator.isDate(dateArray[1]) || 
        new Date(dateArray[0]) > new Date(dateArray[1]))
    ) {
      result.isValid = false;
      result.err = "Неверный формат поля date. Верный формат: либо одна дата в формате YYYY-MM-DD, либо диапазон дат через запятую";
    }
  }
  if (status) {
    if (+status !== 0 && +status !== 1) {
      result.isValid = false;
      result.err = "Неверный формат поля status. Должен быть либо 0, либо 1";
    }
  }
  if (teacherIds) {
    const teachers = teacherIds.split(",");
    if (teachers.some(id => !validator.isInt(id))) {
      result.isValid = false;
      result.err = "Неверный формат поля teacherIds. Верный формат: целое число, либо список чисел через запятую";
    }
  }
  if (studentsCount) {
    const studentsCountArray = studentsCount.split(",");
    if (!validator.isInt(studentsCountArray[0]) || 
      studentsCountArray.length > 1 && (
        !validator.isInt(studentsCountArray[1]) ||
        +studentsCountArray[0] > +studentsCountArray[1])
    ) {
      result.isValid = false;
      result.err = "Неверный формат поля studentsCount. Верный формат: целое число, либо диапазон чисел через запятую";
    }
  }
  if (page) {
    if (!validator.isInt(page)) {
      result.isValid = false;
      result.err = "Неверный формат поля page. Должно быть целое число";
    }
  }
  if (lessonsPerPage) {
    if (!validator.isInt(lessonsPerPage)) {
      result.isValid = false;
      result.err = "Неверный формат поля lessonsPerPage. Должно быть целое число";
    }
  }

  return result;
}

exports.setLessonsValidator = function(params) {
  const {
    title,
    firstDate, 
    lastDate,
    lessonsCount,
    teacherIds, 
    days,
  } = params;

  const result = {
    isValid: true,
    err: null,
  }

  if (!title || validator.isEmpty(title)) {
    result.isValid = false;
    result.err = "Отсутствует обязательное поле title";
  }

  if (firstDate && !validator.isEmpty(firstDate)) {
    if (!validator.isDate(firstDate)) {
      result.isValid = false;
      result.err = "Неверный формат поля firstDate. Верный формат: дата в формате YYYY-MM-DD, либо диапазон дат через запятую";
    }
  } else {
    result.isValid = false;
    result.err = "Отсутствует обязательное поле firstDate";
  }

  if (lastDate && !validator.isEmpty(lastDate)) {
    if (!validator.isDate(lastDate)) {
      result.isValid = false;
      result.err = "Неверный формат поля lastDate. Верный формат: дата в формате YYYY-MM-DD, либо диапазон дат через запятую";
    }
  } else {
    if (!lessonsCount || validator.isEmpty(lessonsCount)) {
      result.isValid = false;
      result.err = "Должно присутствовать одно из обязательных полей: lastDate или lessonsCount";
    }
  }

  if (days) {
    if (!Array.isArray(days) || days.some(day => !validator.isInt(String(day)))) {
      result.isValid = false;
      result.err = "Неверный формат поля teacherIds. Верный формат: целое число, либо список чисел через запятую";
    }
  } else {
    result.isValid = false;
    result.err = "Отсутствует обязательное поле days";
  }

  if (teacherIds) {
    if (!Array.isArray(teacherIds) || teacherIds.some(id => !validator.isInt(String(id)))) {
      result.isValid = false;
      result.err = "Неверный формат поля teacherIds. Верный формат: целое число, либо список чисел через запятую";
    }
  } else {
    result.isValid = false;
    result.err = "Отсутствует обязательное поле teacherIds";
  }

  if (lessonsCount && !validator.isEmpty(String(lessonsCount))) {
    if (!validator.isInt(String(lessonsCount))) {
      result.isValid = false;
      result.err = "Неверный формат поля lessonsCount. Должно быть целое число";
    }
  }

  return result;
}
