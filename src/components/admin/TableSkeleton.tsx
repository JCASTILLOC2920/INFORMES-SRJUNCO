import React from 'react';

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <tr key={i} className="animate-pulse border-b border-gray-50">
          <td className="p-3"><div className="h-4 bg-gray-100 rounded w-4 mx-auto"></div></td>
          <td className="p-3"><div className="h-4 bg-gray-100 rounded w-20 mx-auto"></div></td>
          <td className="p-3"><div className="h-4 bg-gray-100 rounded w-20 mx-auto"></div></td>
          <td className="p-3"><div className="h-4 bg-gray-100 rounded w-24 mx-auto"></div></td>
          <td className="p-3"><div className="h-4 bg-gray-100 rounded w-40"></div></td>
          <td className="p-3"><div className="h-6 bg-gray-100 rounded-full w-12 mx-auto"></div></td>
          <td className="p-3"><div className="h-6 bg-gray-100 rounded-full w-12 mx-auto"></div></td>
          <td className="p-3"><div className="h-6 bg-gray-100 rounded-full w-12 mx-auto"></div></td>
          <td className="p-3"><div className="h-4 bg-gray-100 rounded w-16 mx-auto"></div></td>
          <td className="p-3">
            <div className="flex justify-center gap-1">
              <div className="w-8 h-8 bg-gray-100 rounded"></div>
              <div className="w-8 h-8 bg-gray-100 rounded"></div>
              <div className="w-8 h-8 bg-gray-100 rounded"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;
