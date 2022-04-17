import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Table, TableBody, TableCell, TableRow } from "@mui/material";

function ContributionsPage() {
    return (
        <Box mt={10}>
            <ContributionItem expanded={true} />
            <ContributionItem />
            <ContributionItem />
            <ContributionItem />
        </Box>
    );
}

export default ContributionsPage;

function ContributionItem({expanded=undefined}) {
    return (
        <Accordion expanded={expanded} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                Date de debut
                            </TableCell>
                            <TableCell>
                                22/32/2332
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Date de fin
                            </TableCell>
                            <TableCell>
                                22/32/2332
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </AccordionDetails>
        </Accordion>
    );
}
