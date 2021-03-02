import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import app from "../firebase";
import { useList } from 'react-firebase-hooks/database';

function History() {
    const [snapshots, loading, error] = useList(app.database().ref("submissions"));

    return (
      <Box>
          {error && error ? (
            <div>
                There is an error
            </div>
          ) : (
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Answer</TableCell>
                            <TableCell align="right">Equation</TableCell>
                            <TableCell align="right">User</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && snapshots.slice(Math.max(snapshots.length - 10, 1)).map((row, i) => (
                          <TableRow key={i}>
                              <TableCell component="th" scope="row">
                                  {row.val().answer}
                              </TableCell>
                              <TableCell align="right">{row.val().equation}</TableCell>
                              <TableCell align="right">{row.val().user}</TableCell>
                              <TableCell align="right">{row.val().date}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
          )}
      </Box>
    )
}

export default History;
