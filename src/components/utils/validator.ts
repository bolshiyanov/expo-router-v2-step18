interface ValidatorParams {
  inputText: string;
  autoComplete: string;
  setErrorInputValue: (value: boolean) => void;
}

const validator: (params: ValidatorParams) => void = ({
  inputText,
  autoComplete,
  setErrorInputValue,
}) => {
  if (autoComplete === "email") {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    const isValidEmail = emailPattern.test(inputText);
    setErrorInputValue(!isValidEmail);
  } else if (
    autoComplete === "name" ||
    autoComplete === "name-family" ||
    autoComplete === "postal-address-locality" ||
    autoComplete === "postal-address-region"
  ) {
    const minLength = 2;
    const disallowedCharacters = /[^A-Za-z\s-]/;
    const isValidName =
      inputText.length >= minLength && !disallowedCharacters.test(inputText);

    setErrorInputValue(!isValidName);
  } else if (autoComplete === "tel") {
    const phonePattern = /^[\d.\-+ ]{10,}$/;

    const isValidPhone = phonePattern.test(inputText);
    setErrorInputValue(!isValidPhone);
  } else if (
    autoComplete === "street-address" ||
    autoComplete === "postal-code"
  ) {
    const addressPattern = /^[a-zA-Z0-9\s.,#-]+$/;
    const isValidAddress = addressPattern.test(inputText);
    setErrorInputValue(!isValidAddress);
  }
};

export default validator;
