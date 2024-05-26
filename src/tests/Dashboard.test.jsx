import { it, expect, vi, describe, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Dashboard from '../pages/Dashboard';
import React from 'react';

const mockInvoices = [
  {
    "id": 1,
    "numero_cliente": "7005400387",
    "mes_referencia": "JUN/2023",
    "energia_eletrica_quantidade": 50,
    "energia_eletrica_valor": 43.28,
    "energia_scee_quantidade": 1.007,
    "energia_scee_valor": 652.55,
    "energia_compensada_quantidade": 1.007,
    "energia_compensada_valor": -620,
    "contrib_ilum_publica": 43.28
  }
];

vi.mock('axios', () => ({
  get: vi.fn(() => Promise.resolve({ data: mockInvoices }))
}));

describe('Dashboard', () => {
  afterEach(cleanup);

  it('renders the dashboard title', () => {
    render(<Dashboard />);
    const titleElement = screen.getByText('Dashboard');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the customer number dropdown', () => {
    render(<Dashboard />);
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();
    expect(screen.getByText('Selecione um número de cliente')).toBeInTheDocument();
  });

  it('shows no data initially in the charts', () => {
    render(<Dashboard />);
    const chartData = screen.queryByTestId('chart-data');
    expect(chartData).toBeNull();
  });

  it('clears charts on selecting no customer number', async () => {
    render(<Dashboard />);
    const dropdown = screen.getByRole('combobox');
    userEvent.selectOptions(dropdown, "");
    await waitFor(() => {
      const chartData = screen.queryByTestId('chart-data');
      expect(chartData).toBeNull();
    });
  });
});
