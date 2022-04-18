import { Box, Button, FormControl, FormLabel, Grid, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContextProvider";

function ContributionEnrolmentPage() {
    const navigate = useNavigate();
    const { isAuthenticated} = React.useContext(AuthContext);
    React.useEffect(() => {
        if(!isAuthenticated) {
            toast.error("Vous devez être connecté pour accéder à cette page");
            navigate("/login");
        }
    }, [isAuthenticated]);
    return (
        <Box mt={10} ml={1}>
            <Typography component="h1" variant="h4">
                Demande d'inscription
            </Typography>
            <Typography component="h3" mt={1} variant="h5">
                La cautisation des forts
            </Typography>
            <Grid container>
                <Grid item xs={12} md={6} borderTop={0.3}>
                    <Typography component="form">
                        <FormControl sx={{ mt: 2 }} fullWidth>
                            <FormLabel>
                                Message de motivation
                            </FormLabel>
                            <TextField
                                multiline
                                rows={6}
                                label="Message de motivation"
                            />
                        </FormControl>
                    </Typography>
                </Grid>
            </Grid>
            <Box mt={1}>
                <Button variant="contained">Poster ma demande</Button>
            </Box>
        </Box>
    );
}

export default ContributionEnrolmentPage;
