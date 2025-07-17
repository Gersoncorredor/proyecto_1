import styles from "./CTabla.module.css";
import { useState } from "react";

const CTable = ({ data, columns }) => {
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
      <table className={styles.tabla}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, id) => (
            <tr key={id}>
              {columns.map((col) => {
                return (
                <td key={col.accessor}>
                  {row[col.accessor]}
                </td>
              )})}
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
