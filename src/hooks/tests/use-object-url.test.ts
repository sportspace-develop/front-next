import { renderHook } from '@testing-library/react';

import useObjectURL from '@/hooks/use-object-url';

describe('useObjectURL', () => {
  // Замокаем методы URL
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn((file) => `mock-url-${file}`);
    global.URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Сбрасываем мок после каждого теста
  });

  it('returns null when no initial object is provided', () => {
    const { result } = renderHook(() => useObjectURL(null));

    expect(result.current).toBeNull();
  });

  it('returns a mock URL for the provided file', () => {
    const mockFile = new Blob(['file content'], { type: 'text/plain' });
    const { result } = renderHook(() => useObjectURL(mockFile));

    expect(result.current).toBe(`mock-url-${mockFile}`);
  });

  it('revokes the URL when the object changes', () => {
    const mockFile1 = new Blob(['file 1'], { type: 'text/plain' });
    const mockFile2 = new Blob(['file 2'], { type: 'text/plain' });

    const { rerender } = renderHook((file: Blob | null) => useObjectURL(file), {
      initialProps: mockFile1,
    });

    rerender(mockFile2);

    expect(URL.revokeObjectURL).toHaveBeenCalledWith(`mock-url-${mockFile1}`);
  });
});
