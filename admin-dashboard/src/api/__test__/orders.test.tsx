import { api } from '@/services';
import { getOrders, getTotalOrders } from '..';

const spyHttpClientGet = jest.spyOn(api, 'getData');

describe('orders', () => {
  describe('getOrders', () => {
    it('should fetch recent orders', async () => {
      const mockData = { data: [{ id: 1, title: 'Test Post' }] };
      spyHttpClientGet.mockResolvedValueOnce({
        data: mockData,
      });

      const result = await getOrders();

      expect(result.data).toEqual(mockData);
    });

    it('should return an error when API call fails', async () => {
      const mockError = new Error('API error');
      (spyHttpClientGet as jest.Mock).mockRejectedValueOnce(mockError);

      const result = await getOrders({ limit: 5, query: '123', page: 2 });

      expect(result).toEqual({ error: mockError });
      expect(api.getData).toHaveBeenCalledWith(
        'orders',
        { limit: 5, idOrder: '123', page: 2 },
        { next: { tags: ['orders'], revalidate: 3600 } },
      );
    });
  });

  describe('getTotalOrders', () => {
    it('should fetch recent getTotalOrders', async () => {
      const mockData = { data: [{ id: 1, title: 'Test Post' }] };
      spyHttpClientGet.mockResolvedValueOnce({
        data: mockData,
      });

      const result = await getTotalOrders();

      expect(result.data).toEqual(mockData);
    });

    it('should return an error when API call fails', async () => {
      const mockError = new Error('API error');
      (spyHttpClientGet as jest.Mock).mockRejectedValueOnce(mockError);

      const result = await getTotalOrders();

      expect(result).toEqual({ error: mockError });
    });
  });
});
