class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function checkSku(sku) {
  if (sku.trim() === '') {
    throw new ValidationError('Не указан артикул');
  }
  return sku.trim();
}

try {
  checkSku('   ');
} catch (error) {
  console.log(error.name);
  console.log(error.message);
  console.log(String(error));
  console.log(error instanceof ValidationError);
  console.log(error instanceof Error);
}

// Свою ошибку ловим, чужую пропускаем дальше.
try {
  try {
    checkSku(undefined);
  } catch (error) {
    if (!(error instanceof ValidationError)) {
      throw error;
    }
    console.log('плохие данные');
  }
} catch (error) {
  console.log('баг в коде:', error.name);
}
