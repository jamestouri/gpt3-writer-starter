export function keysFromOption(formType) {
  if (formType == 'email') {
    return {wordCount: 400, communication: 'sending'};
  }
  if (formType == 'text') {
    return {wordCount: 50, communication: 'sending'};
  }
  return {wordCount: 400, communication: 'talking'};
}
