import { loadShipment, type ApiError, type FetchLike, type Result, type Shipment } from './index.js';

type cases = [
  Expect<Equal<ApiError['kind'], 'network' | 'http' | 'invalid'>>,
  Expect<Equal<ReturnType<typeof loadShipment>, Promise<Result<Shipment, ApiError>>>>,
  Expect<Equal<Parameters<typeof loadShipment>, [fetchLike: FetchLike, id: string]>>,
];

// Размеченное объединение: в каждой ветке доступны свои поля.
function describeError(error: ApiError): string {
  switch (error.kind) {
    case 'network':
      return error.message;
    case 'http':
      return String(error.status);
    case 'invalid':
      return error.problems.join('; ');
  }
}

function justStatus(error: ApiError): number {
  // @ts-expect-error status есть только у ошибки kind: 'http'
  return error.status;
}
