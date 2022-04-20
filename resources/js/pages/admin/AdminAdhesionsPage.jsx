import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function AdminAdhesionsPage() {
  return (
    <Box mt={10}>
        <Typography component="h1" variant='h4'>
            Demande d'hadesion a la cotisation 'Test de cotisation'
        </Typography>
        <Accordion>
            <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography component="h3" variant="h4">
                        Accordion 1
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component="h4" variant="h4">
                        Message de motivation:
                    </Typography>
                    <Typography component="p">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit aut aliquam corporis repellendus, exercitationem non necessitatibus doloribus ipsam, esse ipsa, totam atque alias corrupti qui? Rerum dolor recusandae esse voluptatibus!
                    </Typography>
                </AccordionDetails>
                <AccordionActions>
                    <Button variant='contained'>
                        Acepter
                    </Button>
                    <Button color='error' variant='outlined'>
                        Refuser
                    </Button>
                </AccordionActions>
        </Accordion>
    </Box>
  )
}

export default AdminAdhesionsPage
