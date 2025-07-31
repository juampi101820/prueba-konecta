import { useState, useEffect } from "react";

export const useTablaPaginada = (fetchFunction, filtrosIniciales = {}) => {
  const [data, setData] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(10);
  const [total, setTotal] = useState(0);
  const [filtros, setFiltros] = useState(filtrosIniciales);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const respuesta = await fetchFunction({ pagina, limite, ...filtros });
      setData(respuesta.data);
      setTotal(respuesta.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagina, limite, filtros]);

  return {
    data,
    pagina,
    limite,
    total,
    loading,
    setPagina,
    setLimite,
    filtros,
    setFiltros,
    refetch: fetchData,
  };
};
