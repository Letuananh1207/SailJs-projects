// components/Pagination.jsx
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; // Không cần phân trang nếu chỉ có 1 trang

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ marginTop: '1rem' }}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
          style={{
            marginRight: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: page === currentPage ? '#ccc' : '#fff',
            border: '1px solid #999',
            cursor: 'pointer',
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
