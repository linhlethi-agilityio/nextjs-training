import { generateRandomId } from '..';

describe('generateRandomId', () => {
  it('should generate an ID in the correct format', () => {
    const id = generateRandomId();
    const regex = /^\d{3}-\d{3}$/;
    expect(id).toMatch(regex);
  });

  it('should generate different IDs on subsequent calls', () => {
    const id1 = generateRandomId();
    const id2 = generateRandomId();
    expect(id1).not.toBe(id2);
  });

  it('should generate IDs with parts within the correct range', () => {
    const id = generateRandomId();
    const [part1, part2] = id.split('-').map(Number);
    expect(part1).toBeGreaterThanOrEqual(100);
    expect(part1).toBeLessThanOrEqual(999);
    expect(part2).toBeGreaterThanOrEqual(100);
    expect(part2).toBeLessThanOrEqual(999);
  });
});
