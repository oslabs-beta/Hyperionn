import "@testing-library/jest-dom";

vi.mock('react-chartjs-2', () => ({
  Line: () => null
}));