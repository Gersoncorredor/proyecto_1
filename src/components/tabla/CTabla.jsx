import styles from "./CTabla.module.css";
import { useState } from "react";

const CTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>Fecha</th>
          <th className={styles.th}>Hora</th>
          <th className={styles.th}>Consulta</th>
          <th className={styles.th}>Oftalmólogo</th>
          <th className={styles.th}>Usuario</th>
        </tr>
      </thead>
      <tbody>
        {currentRows.map((row, id) => (
          <tr key={id} className={styles.tr}>
            <td className={styles.td}>{row.fecha}</td>
            <td className={styles.td}>{row.hora}</td>
            <td className={styles.td}>{row.consulta}</td>
            <td className={styles.td}>{row.oftalmologo}</td>
            <td className={styles.td}>{row.usuario}</td>
          </tr>
        ))}
      </tbody>
    </table>

     <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </>
  );
};

export default CTable;
