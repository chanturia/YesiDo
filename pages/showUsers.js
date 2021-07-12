import React, {useContext, useEffect} from "react";
import {DataGrid} from '@material-ui/data-grid';
import axios from 'axios'

import absoluteUrl from 'next-absolute-url'

const columns = [
    {field: 'firstAndLastName', headerName: 'first And LastName', flex: 1.5},
    {field: 'userCode', headerName: 'user Code', flex: 1},
    {field: 'amComing', headerName: 'Am Coming', flex: 1, type: 'boolean'},
    {field: 'amount', headerName: 'amount', type: 'number', flex: 1},
    {field: 'needHelpWithTransfer', headerName: 'Need Help With Transfer', type: 'boolean', flex: 1.5},
    {
        field: 'lastUpdated',
        headerName: 'Last Updated',
        flex: 1,
        valueFormatter: ({value}) => new Date(value).toLocaleString('de-GR')
    },
    {field: 'extraInfo', headerName: 'Extra Info', flex: 4},
];
export default function ShowUsers({users}) {
    users = users.map(user => {
        user.id = user._id
        user.amComing = user.amComing === 'yes'
        return user
    })
    const totalAmount = users.reduce((total, user) => {
        if (user.amount) {
            return total + user.amount
        }
        return total
    }, 0)
    return (
        <div style={{height: 400, width: '100%'}}>
            <h1>Total Amount: {totalAmount}</h1>
            <DataGrid rows={users} columns={columns} pageSize={100} autoHeight={true}/>
        </div>
    )
}

export async function getServerSideProps(context) {
    let users = {}
    let {req} = context
    const {origin} = absoluteUrl(req)

    try {
        const {data: Users} = await axios.get(`${origin}/api/getUsers`)
        let {data: UsersSettings} = await axios.get(`${origin}/api/getUsersSettings`)

        UsersSettings = UsersSettings.map(item => {
            const match = Users.filter(user => {
                return user.userCode === item.userCode
            })
            if (match.length > 0) {
                return {...item, ...match[0]}
            }
            return item
        })
        if (UsersSettings) {
            users = UsersSettings
        }
    } catch (err) {
        console.log(err.message)
    }
    return {
        props: {users: users},
    }
}