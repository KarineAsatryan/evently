export function isValidEventName(value) {
  if (value.replace(/\s/g, "") === "" || value.length > 500) return false;
  return true;
}

export function isValidEventLink(value) {
  const linkReg = /^\s*([0-9a-zA-Z]+)\s*$/;
  if (!linkReg.test(value) || value.length > 20) return false;
  return true;
}

export function isValidAddress(value) {
  if (value.replace(/\s/g, "") === "" || value.length > 200) return false;
  return true;
}

export function isValidEmail(email) {
  const emailCheckReg =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailCheckReg.test(email)) return true;
  return false;
}

export function isValidPassword(password) {
  // Minimum eight characters, at least one letter and one number:
  const passwordCheckReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (passwordCheckReg.test(password)) return true;
  return false;
}

export function isEmptyString(value) {
  if (value.replace(/\s/g, "") === "") return false;
  return true;
}

export function isValidHours(value) {
  if (isNaN(value) || Number(value) < 0 || Number(value) > 23) return false;
  return true;
}

export function isValidMinutes(value) {
  if (isNaN(value) || Number(value) < 0 || Number(value) > 59) return false;
  return true;
}

// For example, when the date is checked, the return value, regs, is an array with elements 1 through 3 containing the day, month and year components of the input string. For the time check, the array returned includes the hour (pos 1), minutes (pos 2) and, optionally, the am/pm string (pos 3).
export function checkTime(field) {
  let errorMsg = "";

  // regular expression to match required time format
  const re = /^(\d{1,2}):(\d{2})(:00)?([ap]m)?$/;
  let regs;
  if (field.value !== "") {
    if ((regs = field.value.match(re))) {
      if (regs[4]) {
        // 12-hour time format with am/pm
        if (regs[1] < 1 || regs[1] > 12) {
          errorMsg = "Invalid value for hours: " + regs[1];
        }
      } else {
        // 24-hour time format
        if (regs[1] > 23) {
          errorMsg = "Invalid value for hours: " + regs[1];
        }
      }
      if (!errorMsg && regs[2] > 59) {
        errorMsg = "Invalid value for minutes: " + regs[2];
      }
    } else {
      errorMsg = "Invalid time format: " + field.value;
    }
  }

  if (errorMsg !== "") {
    alert(errorMsg);
    field.focus();
    return false;
  }

  return true;
}

export function checkDate(field) {
  let allowBlank = true;
  let minYear = 1902;
  let maxYear = new Date().getFullYear();

  let errorMsg = "";

  // regular expression to match required date format
  const re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  let regs;
  if (field.value !== "") {
    if ((regs = field.value.match(re))) {
      if (regs[1] < 1 || regs[1] > 31) {
        errorMsg = "Invalid value for day: " + regs[1];
      } else if (regs[2] < 1 || regs[2] > 12) {
        errorMsg = "Invalid value for month: " + regs[2];
      } else if (regs[3] < minYear || regs[3] > maxYear) {
        errorMsg =
          "Invalid value for year: " +
          regs[3] +
          " - must be between " +
          minYear +
          " and " +
          maxYear;
      }
    } else {
      errorMsg = "Invalid date format: " + field.value;
    }
  } else if (!allowBlank) {
    errorMsg = "Empty date not allowed!";
  }

  if (errorMsg !== "") {
    alert(errorMsg);
    field.focus();
    return false;
  }

  return true;
}
