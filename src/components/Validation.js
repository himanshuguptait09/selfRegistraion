// Helper functions for sanitization, validation, and capitalization
export const sanitizeInput = (input) => {
	const sqlInjectionPatterns = /(\%27)|(\')|(--)|(\%23)|(#)/i;
	if (sqlInjectionPatterns.test(input)) {
	  console.error("Invalid input detected (SQL injection)");
	  return "";
	}
	return input;
  };
  
  export const capitalizeWords = (input) => {
	return input.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  
  export const validateDegreeNameAndShortName = (input) => {
	const acceptName = /^[A-Z][a-zA-Z0-9\s(),.-]*$/;
	const sanitizedInput = sanitizeInput(capitalizeWords(input));
	return sanitizedInput && acceptName.test(sanitizedInput);
  };
  
  export const validateDescription = (input) => {
	const acceptDescription = /^[A-Za-z0-9\s()@.#]*$/;
	const sanitizedInput = sanitizeInput(input);
	return sanitizedInput && acceptDescription.test(sanitizedInput);
  };