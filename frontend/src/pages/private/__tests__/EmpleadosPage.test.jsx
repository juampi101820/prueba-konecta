import { render, screen } from '@testing-library/react'
import EmpleadosPage from '../EmpleadosPage'
import { vi } from 'vitest'

// Mock del hook personalizado
vi.mock('../../../hooks/useTablaPaginada', () => ({
  useTablaPaginada: () => ({
    data: [
      {
        id: 1,
        nombre: 'Juan Pérez',
        fecha_ingreso: '2023-01-01',
        salario: '2000000',
      },
    ],
    pagina: 1,
    limite: 10,
    total: 1,
    loading: false,
    setPagina: vi.fn(),
    setFiltros: vi.fn(),
    filtros: {
      nombre: '',
      fecha_ingreso: '',
      salario: '',
    },
  }),
}))

describe('EmpleadosPage', () => {
  it('debe mostrar el título y los datos del empleado', () => {
    render(<EmpleadosPage />)

    // Titulo de la pagina
    expect(screen.getByText('Gestión de Empleados')).toBeInTheDocument()

    // Datos del empleado renderizados
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('2023-01-01')).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('2.000.000'))).toBeInTheDocument()
  })
})