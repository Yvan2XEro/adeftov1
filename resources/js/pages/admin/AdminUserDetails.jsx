import { Box, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import moment from 'moment'
import React, { useCallback,useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUser } from '../../services/usersServices'
import { Profile } from '../ProfilePage'

function AdminUserDetails() {
    const [user, setUser] = useState(null)
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        fetchUser()
    },[])
    const fetchUser = useCallback(()=>{
        getUser(id).then(response=>{
            setUser(response.data)
        }).catch(()=>{
            toast.error("Erreur lors de la recuperation des donnees de l'utilisateur.");
        })
    }, [id])
  return (
    <Box mt={10}>
       <Grid container>
           <Grid p={2} item sm={12} md={4}>
                <Profile data={user} />
           </Grid>
           <Grid p={2} sm={12} md={8}>
               <Infos data={user} />
           </Grid>
       </Grid>
    </Box>
  )
}

export default AdminUserDetails


const Infos = ({data}) => {

    const [selected, setSelected] = useState(null);
    useEffect(()=>{
        setSelected(data?.enrolled_contributions[0]||null)
    }, [data])
    const getStatus = (session) => {
        const payment = session.payments.find(s=>{
            return (s.user_id==data.id && s.status=='paid')})
        if(!!payment) {
            return payment.amount +' FCFA'
        }
        return 'NON PAYE'
    }
    return <Box>
        <Box>
           <FormControl fullWidth>
               <InputLabel>
                   Cotisation
               </InputLabel>
                <Select fullWidth>

                {data?.enrolled_contributions.map(c=><MenuItem key={c.id} onClick={()=>setSelected(c)}>
                    {c.name}
                </MenuItem>)}
            </Select>
           </FormControl>
           {selected&&<Typography component="h3" variant='h4'>{selected.name}</Typography>}
        </Box>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Mois de
                    </TableCell>
                    <TableCell>
                        Seance
                    </TableCell>
                    <TableCell>
                        Status
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {selected?.sessions.map(s=><TableRow key={s.id}>
                    <TableCell>
                        {moment(s?.date).format(
                                "MMMM YYYY"
                            )}
                    </TableCell>
                    <TableCell>
                        {moment(s?.date).format(
                                "DD MMMM YYYY"
                            )}
                    </TableCell>
                    <TableCell>
                       { getStatus(s)}
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </Box>
}
