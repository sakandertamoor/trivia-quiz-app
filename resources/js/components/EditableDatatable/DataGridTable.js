/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function BasicEditingGrid({
    rows,
    columns,
    onCellEditCommit
}) {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid 
      rows={rows} 
      columns={columns} 
      onCellEditCommit={onCellEditCommit}
      isRowSelectable={(params) => {
        console.log("parrams", params, window.auth.user.email);
        return params.row.email !== window.auth.user.email
      }}
      checkboxSelection
      />
    </div>
  );
}